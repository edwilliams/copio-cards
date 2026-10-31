/**
 * Stow Cards Application Controller
 * Pure ESM implementation for the Private Loyalty & Pocket Wallet.
 * Opens afresh without pre-populated cards; users add cards by choosing a store
 * and scanning the card's barcode or QR code (or entering the number manually).
 */

import { walletStorage, STORE_PRESETS } from './wallet-storage.js';
import {
  generateBarcode1D,
  generateQRCode,
  formatCardNumber,
  maskCardNumber,
  BarcodeScanner,
} from './barcode-engine.js';
import { SyncManager } from './services/sync-service.js';

export class StowCardsApp {
  /** @type {Array<Object>} */
  cards = [];
  /** @type {'all'|'supermarket'|'pharmacy'|'coffee'|'home'} */
  activeCategory = 'all';
  searchQuery = '';
  isBrightnessBoostActive = false;
  selectedPresetKey = 'tesco';
  /** @type {'code128'|'ean13'|'qr'} */
  selectedBarcodeType = 'code128';
  barcodeScanner = new BarcodeScanner();
  /** @type {SyncManager|null} */
  syncManager = null;

  // DOM Elements
  cardsGrid = null;
  searchInput = null;
  searchClearBtn = null;
  brightnessOverlay = null;
  toastPill = null;
  toastMsg = null;
  addModal = null;
  syncModal = null;
  storePickerGrid = null;
  modalCardPreview = null;
  previewStoreName = null;
  previewCardTier = null;
  previewCardHolder = null;
  previewMaskedNum = null;
  addInputNumber = null;
  scannerViewfinder = null;
  scannerVideo = null;
  scannerCanvas = null;
  barcodeReticle = null;
  reticleStatusText = null;
  btnStartCamera = null;
  cameraBtnText = null;
  btnSwitchCamera = null;

  async init() {
    this.#cacheDom();
    this.#restoreTheme();
    this.#bindEvents();

    walletStorage.subscribe(async () => {
      this.cards = await walletStorage.getCards();
      this.updateCategoryCounts();
      this.renderCardsGrid();
    });

    await this.loadCards();
    this.#checkUrlForPeerSync();
  }

  #cacheDom() {
    this.cardsGrid = document.getElementById('cards-grid');
    this.searchInput = document.getElementById('card-search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.brightnessOverlay = document.getElementById('brightness-overlay');
    this.toastPill = document.getElementById('toast-pill');
    this.toastMsg = document.getElementById('toast-msg');

    this.addModal = document.getElementById('add-modal');
    this.syncModal = document.getElementById('sync-modal');
    this.storePickerGrid = document.getElementById('store-picker-grid');
    this.modalCardPreview = document.getElementById('modal-card-preview');
    this.previewStoreName = document.getElementById('preview-store-name');
    this.previewCardTier = document.getElementById('preview-card-tier');
    this.previewCardHolder = document.getElementById('preview-card-holder');
    this.previewMaskedNum = document.getElementById('preview-masked-num');
    this.addInputNumber = document.getElementById('add-input-number');

    this.scannerViewfinder = document.getElementById('scanner-viewfinder');
    this.scannerVideo = /** @type {HTMLVideoElement|null} */ (document.getElementById('scanner-live-video'));
    this.scannerCanvas = /** @type {HTMLCanvasElement|null} */ (document.getElementById('scanner-camera-canvas'));
    this.barcodeReticle = document.getElementById('barcode-reticle');
    this.reticleStatusText = document.getElementById('reticle-status-text');
    this.btnStartCamera = document.getElementById('btn-start-camera');
    this.cameraBtnText = document.getElementById('camera-btn-text');
    this.btnSwitchCamera = document.getElementById('btn-switch-camera');
  }

  #restoreTheme() {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('stow_cards_theme') : null;
      const theme = saved === 'light' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', theme);
      const themeIcon = document.getElementById('theme-icon');
      if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    } catch {}
  }

  toggleTheme() {
    const cur = document.body.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('stow_cards_theme', next);
      }
    } catch {}
  }

  #bindEvents() {
    // Theme toggle
    const btnTheme = document.getElementById('btn-theme-toggle');
    if (btnTheme) {
      btnTheme.addEventListener('click', () => this.toggleTheme());
    }

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = /** @type {HTMLInputElement} */ (e.target).value;
        if (this.searchClearBtn) {
          this.searchClearBtn.classList.toggle('visible', !!this.searchQuery);
        }
        this.renderCardsGrid();
      });
    }

    if (this.searchClearBtn) {
      this.searchClearBtn.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchQuery = '';
        }
        this.searchClearBtn.classList.remove('visible');
        this.renderCardsGrid();
      });
    }

    // Category pills
    document.querySelectorAll('.category-pill, .pill-btn').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill, .pill-btn').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = /** @type {any} */ (pill.getAttribute('data-category') || 'all');
        this.renderCardsGrid();
      });
    });

    // Add card button
    const btnAdd = document.getElementById('btn-open-add-card');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => this.openAddModal());
    }

    // Modal close & save
    const btnCloseModal = document.getElementById('modal-close-btn');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => this.closeAddModal());
    }

    const btnCancelModal = document.getElementById('modal-cancel-btn');
    if (btnCancelModal) {
      btnCancelModal.addEventListener('click', () => this.closeAddModal());
    }

    const btnSaveModal = document.getElementById('modal-save-btn');
    if (btnSaveModal) {
      btnSaveModal.addEventListener('click', () => this.saveNewCard());
    }

    if (this.addModal) {
      this.addModal.addEventListener('click', (e) => {
        if (e.target === this.addModal) this.closeAddModal();
      });
    }

    // Barcode / Membership number live input
    if (this.addInputNumber) {
      this.addInputNumber.addEventListener('input', (e) => {
        const val = /** @type {HTMLInputElement} */ (e.target).value;
        if (this.previewMaskedNum) {
          this.previewMaskedNum.textContent = maskCardNumber(val);
        }
        this.drawScannerStandbyCanvas();
      });
      this.addInputNumber.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveNewCard();
        }
      });
    }

    // Camera scanner controls
    if (this.btnStartCamera) {
      this.btnStartCamera.addEventListener('click', () => this.toggleCameraScanner());
    }

    if (this.scannerViewfinder) {
      this.scannerViewfinder.addEventListener('click', () => {
        if (!this.barcodeScanner.isActive) {
          this.toggleCameraScanner();
        }
      });
    }

    if (this.btnSwitchCamera) {
      this.btnSwitchCamera.addEventListener('click', async (e) => {
        e.stopPropagation();
        await this.barcodeScanner.switchCamera(
          this.scannerVideo,
          this.scannerCanvas,
          (res) => this.handleBarcodeDetected(res)
        );
      });
    }

    // Barcode format pills (1D vs QR)
    document.querySelectorAll('#barcode-type-pills .filter-pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const bType = /** @type {'code128'|'qr'} */ (btn.getAttribute('data-barcode-type') || 'code128');
        this.setBarcodeTypeUI(bType);
      });
    });

    // Sync button & modal
    const btnSync = document.getElementById('btn-open-sync');
    if (btnSync) {
      btnSync.addEventListener('click', () => this.openSyncModal());
    }

    const btnCloseSync = document.getElementById('sync-close-btn');
    if (btnCloseSync) {
      btnCloseSync.addEventListener('click', () => this.closeSyncModal());
    }

    const btnDoneSync = document.getElementById('sync-done-btn');
    if (btnDoneSync) {
      btnDoneSync.addEventListener('click', () => this.closeSyncModal());
    }

    if (this.syncModal) {
      this.syncModal.addEventListener('click', (e) => {
        if (e.target === this.syncModal) this.closeSyncModal();
      });
    }

    // Keyboard shortcuts ('/' to search, Escape to close modals)
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== this.searchInput && !this.addModal?.classList.contains('open')) {
        e.preventDefault();
        this.searchInput?.focus();
      }
      if (e.key === 'Escape') {
        if (this.addModal?.classList.contains('open')) this.closeAddModal();
        if (this.syncModal?.classList.contains('open')) this.closeSyncModal();
        if (this.isBrightnessBoostActive) this.toggleBrightnessBoost(false);
      }
    });

    // Dismiss brightness overlay on tap
    if (this.brightnessOverlay) {
      this.brightnessOverlay.addEventListener('click', () => {
        this.toggleBrightnessBoost(false);
      });
    }
  }

  async loadCards() {
    this.cards = await walletStorage.getCards();
    this.updateCategoryCounts();
    this.renderCardsGrid();
  }

  updateCategoryCounts() {
    const categories = ['all', 'supermarket', 'pharmacy', 'coffee', 'home'];
    categories.forEach((cat) => {
      const el = document.getElementById(`count-${cat}`);
      if (!el) return;
      if (cat === 'all') {
        el.textContent = String(this.cards.length);
      } else {
        el.textContent = String(this.cards.filter((c) => c.category === cat).length);
      }
    });
  }

  renderCardsGrid() {
    if (!this.cardsGrid) return;

    // Fresh empty wallet state (0 cards added yet)
    if (this.cards.length === 0) {
      this.cardsGrid.innerHTML = `
        <div class="empty-wallet-card">
          <div style="font-size: 42px; line-height: 1;">📇</div>
          <h3 style="font-size: 18px; font-weight: 700;">Your Pocket Wallet is Empty</h3>
          <p style="font-size: 14px; color: var(--color-text-muted); max-width: 420px;">
            Add your first loyalty card by selecting a store and scanning the card's barcode or QR code.
          </p>
          <button type="button" class="btn-action btn-action-primary" id="btn-empty-add-card" style="margin-top: 6px;">
            + Add Loyalty Card
          </button>
        </div>
      `;
      const btnEmptyAdd = this.cardsGrid.querySelector('#btn-empty-add-card');
      if (btnEmptyAdd) {
        btnEmptyAdd.addEventListener('click', () => this.openAddModal());
      }
      return;
    }

    const filtered = this.cards.filter((card) => {
      const matchesCategory = this.activeCategory === 'all' || card.category === this.activeCategory;
      const q = this.searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (card.store && card.store.toLowerCase().includes(q)) ||
        (card.title && card.title.toLowerCase().includes(q)) ||
        (card.number && card.number.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      this.cardsGrid.innerHTML = `
        <div class="empty-wallet-card">
          <div style="font-size: 38px;">🔍</div>
          <h3 style="font-size: 16px; font-weight: 700;">No matching cards</h3>
          <p style="font-size: 13px; color: var(--color-text-muted);">
            No loyalty cards matching "${this.#escapeHtml(this.searchQuery || this.activeCategory)}".
          </p>
        </div>
      `;
      return;
    }

    this.cardsGrid.innerHTML = filtered
      .map((card) => {
        const isFlipped = !!card.isFlipped;
        const barcodeSvg =
          card.barcodeType === 'qr'
            ? generateQRCode(card.number, 86)
            : generateBarcode1D(card.number, card.barcodeType || 'auto');

        const frontStyle = `background: linear-gradient(135deg, ${card.color || '#00539f'}, ${card.colorEnd || card.color || '#002f6c'});`;
        const holderLabel = card.holder || card.title || 'LOYALTY CARD';

        return `
          <div class="card-3d-wrapper ${isFlipped ? 'is-flipped' : ''}" data-id="${card.id}">
            <div class="card-3d-flipper">
              
              <!-- FRONT FACE: Official Store Brand Artwork & Masked Digits -->
              <div class="card-face card-face-front" style="${frontStyle}">
                <div class="front-top-row">
                  <div class="store-badge-group">
                    <span class="store-brand-title">${this.#escapeHtml(card.store)}</span>
                    <span class="store-card-tier">${this.#escapeHtml(card.title)}</span>
                  </div>
                  <span class="flip-pill-hint">↻ Tap to scan</span>
                </div>

                <div class="front-mid-row">
                  <div class="card-smart-chip"></div>
                  <div class="store-logo-symbol">${card.symbol || '🛒'}</div>
                </div>

                <div class="front-bottom-row">
                  <span class="card-holder-name">${this.#escapeHtml(holderLabel)}</span>
                  <span class="card-masked-number">${maskCardNumber(card.number)}</span>
                </div>
              </div>

              <!-- BACK FACE: High Contrast Checkout Barcode & Max Bright -->
              <div class="card-face card-face-back">
                <div class="back-top-row">
                  <span class="back-store-name">${this.#escapeHtml(card.store)}</span>
                  <div class="back-actions-group">
                    <button class="btn-max-bright ${this.isBrightnessBoostActive ? 'active' : ''}" data-action="bright" title="Screen brightness boost for optical checkouts">
                      ☀ Max Bright
                    </button>
                    <button class="btn-card-delete" data-action="delete" title="Delete card">
                      🗑
                    </button>
                    <button class="btn-flip-back" data-action="flip-back" title="Flip to front">
                      ↻ Front
                    </button>
                  </div>
                </div>

                <div class="back-barcode-container">
                  <div class="back-barcode-svg-wrap">
                    ${barcodeSvg}
                  </div>
                  <div class="back-number-text">
                    ${formatCardNumber(card.number)}
                  </div>
                </div>
              </div>

            </div>
          </div>
        `;
      })
      .join('');

    // Attach click listeners to cards
    this.cardsGrid.querySelectorAll('.card-3d-wrapper').forEach((wrapper) => {
      wrapper.addEventListener('click', (e) => {
        const id = wrapper.getAttribute('data-id');
        const card = this.cards.find((c) => c.id === id);
        if (!card) return;

        // Max bright button
        if (/** @type {HTMLElement} */ (e.target).closest('button[data-action="bright"]')) {
          e.stopPropagation();
          this.toggleBrightnessBoost();
          return;
        }

        // Delete button
        if (/** @type {HTMLElement} */ (e.target).closest('button[data-action="delete"]')) {
          e.stopPropagation();
          this.deleteCard(card.id);
          return;
        }

        // Flip card in place
        card.isFlipped = !card.isFlipped;
        wrapper.classList.toggle('is-flipped', card.isFlipped);
      });
    });
  }

  toggleBrightnessBoost(forcedState) {
    this.isBrightnessBoostActive = typeof forcedState === 'boolean' ? forcedState : !this.isBrightnessBoostActive;
    if (this.brightnessOverlay) {
      this.brightnessOverlay.classList.toggle('active', this.isBrightnessBoostActive);
    }
    document.querySelectorAll('button[data-action="bright"]').forEach((btn) => {
      btn.classList.toggle('active', this.isBrightnessBoostActive);
    });

    if (this.isBrightnessBoostActive) {
      this.showToast('☀ Max Brightness active for optical till scanners');
    } else {
      this.showToast('Brightness restored');
    }
  }

  async deleteCard(id) {
    await walletStorage.deleteCard(id);
    this.cards = this.cards.filter((c) => c.id !== id);
    this.updateCategoryCounts();
    this.renderCardsGrid();
    this.showToast('Card removed from wallet');
  }

  /* ========================================================================
     ADD CARD & BARCODE / QR CODE SCANNING
     ======================================================================== */
  openAddModal() {
    if (this.addInputNumber) {
      this.addInputNumber.value = '';
    }
    if (this.barcodeReticle) {
      this.barcodeReticle.classList.remove('scanned');
    }
    if (this.reticleStatusText) {
      this.reticleStatusText.textContent = 'Point camera at barcode or QR code';
    }

    this.renderStorePicker();
    this.updatePresetUI();
    this.drawScannerStandbyCanvas();

    if (this.addModal) {
      this.addModal.classList.add('open');
    }
    if (this.addInputNumber) {
      this.addInputNumber.focus();
    }
  }

  closeAddModal() {
    this.stopCameraScanner();
    if (this.addModal) {
      this.addModal.classList.remove('open');
    }
  }

  async toggleCameraScanner() {
    if (this.barcodeScanner.isActive) {
      this.stopCameraScanner();
      return;
    }

    try {
      if (this.barcodeReticle) {
        this.barcodeReticle.classList.remove('scanned');
      }
      if (this.reticleStatusText) {
        this.reticleStatusText.textContent = 'Scanning for barcode or QR code...';
      }
      if (this.scannerCanvas) {
        this.scannerCanvas.style.display = 'none';
      }

      await this.barcodeScanner.start(
        this.scannerVideo,
        this.scannerCanvas,
        (result) => this.handleBarcodeDetected(result)
      );

      if (this.cameraBtnText) {
        this.cameraBtnText.textContent = 'Stop Camera';
      }
      if (this.btnStartCamera) {
        this.btnStartCamera.classList.add('active');
      }
      if (this.btnSwitchCamera) {
        this.btnSwitchCamera.style.display = 'inline-flex';
      }
    } catch {
      this.stopCameraScanner();
      if (this.reticleStatusText) {
        this.reticleStatusText.textContent = 'Camera unavailable — enter card number below';
      }
      this.showToast('Camera unavailable or permission denied. Enter card number manually.');
    }
  }

  stopCameraScanner() {
    this.barcodeScanner.stop(this.scannerVideo);
    if (this.scannerCanvas) {
      this.scannerCanvas.style.display = 'block';
    }
    if (this.cameraBtnText) {
      this.cameraBtnText.textContent = 'Start Camera Scanner';
    }
    if (this.btnStartCamera) {
      this.btnStartCamera.classList.remove('active');
    }
    if (this.btnSwitchCamera) {
      this.btnSwitchCamera.style.display = 'none';
    }
    this.drawScannerStandbyCanvas();
  }

  /**
   * Callback invoked when a 1D barcode or 2D QR code is detected
   * @param {{ rawValue: string, format?: string, barcodeType?: 'qr'|'ean13'|'code128' }} result
   */
  handleBarcodeDetected(result) {
    if (!result || !result.rawValue) return;
    const code = result.rawValue.trim();
    if (!code) return;

    const bType =
      result.barcodeType ||
      BarcodeScanner.normalizeBarcodeType(result.format || '', code);

    if (this.addInputNumber) {
      this.addInputNumber.value = code;
    }
    this.setBarcodeTypeUI(bType);

    if (this.previewMaskedNum) {
      this.previewMaskedNum.textContent = maskCardNumber(code);
    }
    if (this.barcodeReticle) {
      this.barcodeReticle.classList.add('scanned');
    }
    if (this.reticleStatusText) {
      this.reticleStatusText.textContent = `✓ Scanned: ${code}`;
    }

    this.stopCameraScanner();
    this.showToast(`✓ Scanned ${bType === 'qr' ? 'QR code' : 'barcode'}: ${code}`);
  }

  setBarcodeTypeUI(barcodeType) {
    this.selectedBarcodeType = barcodeType;
    const isQr = barcodeType === 'qr';
    document.querySelectorAll('#barcode-type-pills .filter-pill-btn').forEach((btn) => {
      const btnType = btn.getAttribute('data-barcode-type');
      btn.classList.toggle('active', isQr ? btnType === 'qr' : btnType !== 'qr');
    });
    this.drawScannerStandbyCanvas();
  }

  drawScannerStandbyCanvas() {
    if (!this.scannerCanvas) return;
    const ctx = this.scannerCanvas.getContext('2d');
    if (!ctx) return;

    const w = this.scannerCanvas.width || 600;
    const h = this.scannerCanvas.height || 320;

    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, w, h);

    const preset = STORE_PRESETS.find((p) => p.key === this.selectedPresetKey) || STORE_PRESETS[0];
    const currentNum = this.addInputNumber?.value.trim() || preset.sampleNumber;

    const cx = 110;
    const cy = 38;
    const cw = 380;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + 20, cy + 44, cw - 40, 118);

    ctx.fillStyle = '#000000';
    if (this.selectedBarcodeType === 'qr') {
      // Draw mini QR finder preview in standby canvas
      const qx = cx + cw / 2 - 36;
      const qy = cy + 56;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeRect(qx, qy, 24, 24);
      ctx.strokeRect(qx + 48, qy, 24, 24);
      ctx.strokeRect(qx, qy + 48, 24, 24);
      ctx.fillRect(qx + 7, qy + 7, 10, 10);
      ctx.fillRect(qx + 55, qy + 7, 10, 10);
      ctx.fillRect(qx + 7, qy + 55, 10, 10);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(qx + 28 + c * 5, qy + 28 + r * 5, 4, 4);
          }
        }
      }
    } else {
      for (let i = 0; i < 30; i++) {
        const bx = cx + 42 + i * 10;
        const bw = i % 3 === 0 ? 5 : 2;
        ctx.fillRect(bx, cy + 58, bw, 64);
      }
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(formatCardNumber(currentNum), cx + cw / 2, cy + 146);
      ctx.textAlign = 'start';
    }
  }

  renderStorePicker() {
    if (!this.storePickerGrid) return;

    this.storePickerGrid.innerHTML = STORE_PRESETS.map((preset) => {
      const isSelected = preset.key === this.selectedPresetKey;
      return `
        <div class="store-chip-option ${isSelected ? 'selected' : ''}" data-key="${preset.key}">
          <div class="store-thumb-badge" style="background: linear-gradient(135deg, ${preset.color}, ${preset.colorEnd});"></div>
          <span class="store-thumb-label">${this.#escapeHtml(preset.store)}</span>
        </div>
      `;
    }).join('');

    this.storePickerGrid.querySelectorAll('.store-chip-option').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.selectedPresetKey = chip.getAttribute('data-key') || 'tesco';
        this.updatePresetUI();
      });
    });
  }

  updatePresetUI() {
    if (!this.storePickerGrid) return;
    this.storePickerGrid.querySelectorAll('.store-chip-option').forEach((chip) => {
      chip.classList.toggle('selected', chip.getAttribute('data-key') === this.selectedPresetKey);
    });

    const preset = STORE_PRESETS.find((p) => p.key === this.selectedPresetKey) || STORE_PRESETS[0];

    if (this.previewStoreName) this.previewStoreName.textContent = preset.store;
    if (this.previewCardTier) this.previewCardTier.textContent = preset.title;
    if (this.previewCardHolder) this.previewCardHolder.textContent = preset.title.toUpperCase();

    if (this.modalCardPreview) {
      this.modalCardPreview.style.backgroundImage = 'none';
      this.modalCardPreview.style.background = `linear-gradient(135deg, ${preset.color}, ${preset.colorEnd})`;
    }

    if (this.addInputNumber) {
      this.addInputNumber.placeholder = `Scan barcode or enter number (e.g. ${preset.sampleNumber})`;
    }

    const currentVal = this.addInputNumber?.value.trim() || '';
    if (this.previewMaskedNum) {
      this.previewMaskedNum.textContent = maskCardNumber(currentVal);
    }

    this.setBarcodeTypeUI(preset.barcodeType === 'qr' ? 'qr' : 'code128');
  }

  async saveNewCard() {
    const preset = STORE_PRESETS.find((p) => p.key === this.selectedPresetKey) || STORE_PRESETS[0];
    const num = this.addInputNumber?.value.trim() || '';

    if (!num) {
      this.showToast('Please scan the card barcode/QR code or enter the card number');
      this.addInputNumber?.focus();
      return null;
    }

    const isQr = this.selectedBarcodeType === 'qr';
    const barcodeType = isQr
      ? 'qr'
      : /^\d{12,13}$/.test(num)
      ? 'ean13'
      : 'code128';

    const newCard = {
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      store: preset.store,
      title: preset.title,
      category: preset.category,
      number: num,
      barcodeType,
      color: preset.color,
      colorEnd: preset.colorEnd,
      symbol: preset.symbol,
      holder: preset.title.toUpperCase(),
      isFlipped: false,
      createdAt: Date.now(),
    };

    await walletStorage.saveCard(newCard);
    this.cards = await walletStorage.getCards();
    this.updateCategoryCounts();
    this.renderCardsGrid();
    this.closeAddModal();
    this.showToast(`Added ${newCard.store} ${newCard.title} to wallet! ↻ Tap to scan`);
    return newCard;
  }

  /* ========================================================================
     P2P SYNC MODAL
     ======================================================================== */
  #checkUrlForPeerSync() {
    if (typeof window === 'undefined' || !window.location) return;
    const params = new URLSearchParams(window.location.search);
    const peerId = params.get('peer');
    if (peerId) {
      window.history.replaceState({}, '', window.location.pathname);
      this.openSyncModal(peerId);
    }
  }

  openSyncModal(remotePeerId = null) {
    const syncContainer = document.getElementById('sync-qr-container');
    const statusText = document.getElementById('sync-status-text');

    // Render immediate standards-compliant QR code
    const fallbackUrl = `${typeof location !== 'undefined' ? location.origin + location.pathname : 'https://copio-cards.netlify.app/'}?peer=local_${Date.now().toString(36)}`;
    if (syncContainer) {
      syncContainer.innerHTML = generateQRCode(fallbackUrl, 180);
    }

    if (this.syncModal) {
      this.syncModal.classList.add('open');
    }

    // Attempt live WebRTC PeerJS pairing if online
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        if (this.syncManager) {
          this.syncManager.close();
        }
        this.syncManager = new SyncManager(walletStorage, (state) => {
          if (!state) return;
          if (state.step === 'waiting' && state.url && syncContainer) {
            syncContainer.innerHTML = generateQRCode(state.url, 180);
            if (statusText) {
              statusText.textContent = 'Scan this QR code with your other device to pair via encrypted WebRTC.';
            }
          } else if (state.step === 'connecting' && statusText) {
            statusText.textContent = 'Connecting to peer device…';
          } else if (state.step === 'syncing' && statusText) {
            statusText.textContent = 'Syncing loyalty cards…';
          } else if (state.step === 'done' && statusText) {
            statusText.textContent = `Sync complete — ${state.added || 0} card(s) added!`;
          }
        });

        if (remotePeerId) {
          this.syncManager.startJoiner(remotePeerId);
        } else {
          this.syncManager.startHost();
        }
      }
    } catch {
      // Fallback QR already rendered
    }
  }

  closeSyncModal() {
    if (this.syncManager) {
      this.syncManager.close();
      this.syncManager = null;
    }
    if (this.syncModal) {
      this.syncModal.classList.remove('open');
    }
  }

  /* ========================================================================
     TOAST NOTIFICATIONS
     ======================================================================== */
  #toastTimer = null;
  showToast(msg) {
    if (!this.toastPill || !this.toastMsg) return;
    this.toastMsg.textContent = msg;
    this.toastPill.classList.add('show');
    if (this.#toastTimer) clearTimeout(this.#toastTimer);
    this.#toastTimer = setTimeout(() => {
      this.toastPill?.classList.remove('show');
    }, 2800);
  }

  #escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[tag] || tag));
  }
}

// Global bootstrap
export const stowCardsApp = new StowCardsApp();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      stowCardsApp.init();
    });
  } else {
    stowCardsApp.init();
  }
}
