/**
 * Stow Cards Application Controller
 * Pure ESM implementation dogfooding <copio-scanner>
 * Approved UX specification (CPO-047, CPO-048, docs/copio-cards-ux-spec.md)
 */

import { walletStorage, STORE_PRESETS } from './wallet-storage.js';
import { generateBarcode1D, generateQRCode, formatCardNumber, maskCardNumber } from './barcode-engine.js';

export class StowCardsApp {
  /** @type {Array<Object>} */
  cards = [];
  /** @type {'all'|'supermarket'|'pharmacy'|'coffee'|'home'} */
  activeCategory = 'all';
  searchQuery = '';
  isBrightnessBoostActive = false;
  selectedPresetKey = 'tesco';
  scannedCardPhoto = null;
  /** @type {any} */
  scannerElement = null;

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
  previewMaskedNum = null;
  addInputNumber = null;
  scannerHost = null;

  async init() {
    this.#cacheDom();
    this.#bindEvents();
    await this.loadCards();
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
    this.previewMaskedNum = document.getElementById('preview-masked-num');
    this.addInputNumber = document.getElementById('add-input-number');
    this.scannerHost = document.getElementById('modal-scanner-host');
  }

  #bindEvents() {
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
    document.querySelectorAll('.category-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach((p) => p.classList.remove('active'));
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

    // Sync button
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

    // Keyboard shortcut '/' to search
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
          <div style="font-size: 38px;">📇</div>
          <h3 style="font-size: 16px; font-weight: 700;">No cards found</h3>
          <p style="font-size: 13px; color: var(--color-text-muted);">
            No loyalty cards matching "${this.#escapeHtml(this.searchQuery)}". Tap "+ Add Card" to add one.
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
            ? generateQRCode(card.number, 100)
            : generateBarcode1D(card.number, card.barcodeType || 'auto');

        const frontStyle = card.frontImage
          ? `background-image: url('${card.frontImage}'); background-size: cover; background-position: center;`
          : `background: linear-gradient(135deg, ${card.color || '#00539f'}, ${card.colorEnd || card.color || '#002f6c'});`;

        return `
          <div class="card-3d-wrapper ${isFlipped ? 'is-flipped' : ''}" data-id="${card.id}">
            <div class="card-3d-flipper">
              
              <!-- FRONT FACE: Brand Artwork & Masked Digits -->
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
                  <span class="card-holder-name">${this.#escapeHtml(card.holder || 'ED WILLIAMS')}</span>
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
          if (confirm(`Delete ${card.store} ${card.title} from your wallet?`)) {
            this.deleteCard(card.id);
          }
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
     ADD CARD & EMBEDDED <copio-scanner> DOGFOODING
     ======================================================================== */
  openAddModal() {
    this.scannedCardPhoto = null;
    this.renderStorePicker();
    this.updatePresetUI();
    this.#setupEmbeddedScanner();

    if (this.addModal) {
      this.addModal.classList.add('open');
    }
    if (this.addInputNumber) {
      this.addInputNumber.focus();
    }
  }

  closeAddModal() {
    if (this.addModal) {
      this.addModal.classList.remove('open');
    }
    // Clean up scanner camera stream
    if (this.scannerElement && typeof this.scannerElement.clear === 'function') {
      this.scannerElement.clear();
    }
  }

  #setupEmbeddedScanner() {
    if (!this.scannerHost) return;

    // Check if customElements has registered copio-scanner
    if (!customElements.get('copio-scanner')) {
      console.warn('<copio-scanner> not yet registered in customElements');
      return;
    }

    // Reuse or create scanner instance
    let scanner = this.scannerHost.querySelector('copio-scanner');
    if (!scanner) {
      scanner = document.createElement('copio-scanner');
      scanner.setAttribute('id', 'wallet-scanner');
      scanner.setAttribute('mode', 'single');
      scanner.setAttribute('aspect', 'card');
      scanner.setAttribute('theme', 'dark');
      scanner.setAttribute('ocr', 'true');
      this.scannerHost.appendChild(scanner);

      // Listen to unified copio:scan-complete event (CPO-036)
      scanner.addEventListener('copio:scan-complete', (e) => {
        const detail = e.detail || {};
        const pages = detail.pages || (detail.page ? [detail.page] : []);
        if (pages.length > 0) {
          const page = pages[0];
          const imgSrc = page.croppedSrc || page.src || page.originalSrc;
          this.scannedCardPhoto = imgSrc;

          // If OCR recognized digits, autofill
          if (detail.text) {
            const digitsMatch = detail.text.replace(/\s+/g, '').match(/\d{8,18}/);
            if (digitsMatch && this.addInputNumber) {
              this.addInputNumber.value = digitsMatch[0];
            }
          }

          if (this.modalCardPreview) {
            this.modalCardPreview.style.backgroundImage = `url('${imgSrc}')`;
          }
          this.showToast('✓ Card scanned with <copio-scanner>! Ready to save.');
        }
      });
    }

    this.scannerElement = scanner;
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

    if (this.modalCardPreview) {
      if (this.scannedCardPhoto) {
        this.modalCardPreview.style.backgroundImage = `url('${this.scannedCardPhoto}')`;
      } else {
        this.modalCardPreview.style.backgroundImage = 'none';
        this.modalCardPreview.style.background = `linear-gradient(135deg, ${preset.color}, ${preset.colorEnd})`;
      }
    }

    if (this.addInputNumber && !this.addInputNumber.value) {
      this.addInputNumber.value = preset.sampleNumber;
    }
    if (this.previewMaskedNum) {
      const val = this.addInputNumber?.value || preset.sampleNumber;
      this.previewMaskedNum.textContent = maskCardNumber(val);
    }
  }

  async saveNewCard() {
    const preset = STORE_PRESETS.find((p) => p.key === this.selectedPresetKey) || STORE_PRESETS[0];
    const num = this.addInputNumber?.value.trim() || preset.sampleNumber;

    const newCard = {
      id: `card-${Date.now()}`,
      store: preset.store,
      title: preset.title,
      category: preset.category,
      number: num,
      barcodeType: preset.barcodeType,
      color: preset.color,
      colorEnd: preset.colorEnd,
      symbol: preset.symbol,
      holder: 'ED WILLIAMS',
      frontImage: this.scannedCardPhoto,
      backImage: null,
      isFlipped: false,
      createdAt: Date.now(),
    };

    await walletStorage.saveCard(newCard);
    this.cards.unshift(newCard);
    this.updateCategoryCounts();
    this.renderCardsGrid();
    this.closeAddModal();
    this.showToast(`Added ${newCard.store} card to wallet! ↻ Tap to scan`);
  }

  /* ========================================================================
     P2P SYNC MODAL
     ======================================================================== */
  openSyncModal() {
    const syncContainer = document.getElementById('sync-qr-container');
    if (syncContainer) {
      const syncSessionId = `copio-sync://${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      syncContainer.innerHTML = generateQRCode(syncSessionId, 180);
    }
    if (this.syncModal) {
      this.syncModal.classList.add('open');
    }
  }

  closeSyncModal() {
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
  window.addEventListener('DOMContentLoaded', () => {
    stowCardsApp.init();
  });
}
