/**
 * Copio Cards — Offline-First Loyalty & Pocket Card Wallet
 * Minimal client-side application showcasing <copio-scanner>.
 * Opens afresh with 0 cards and no preset brands: users input their card/brand name,
 * choose a colour gradient background, and use <copio-scanner> to take a photo
 * or upload a screenshot of their card's barcode or QR code.
 */

export const CARD_GRADIENTS = [
  {
    key: 'ocean',
    label: 'Ocean',
    color: '#00539f',
    colorEnd: '#002f6c',
  },
  {
    key: 'sunset',
    label: 'Sunset',
    color: '#e05a00',
    colorEnd: '#4e1e66',
  },
  {
    key: 'emerald',
    label: 'Emerald',
    color: '#025826',
    colorEnd: '#013316',
  },
  {
    key: 'obsidian',
    label: 'Obsidian',
    color: '#1e293b',
    colorEnd: '#0f172a',
  },
  {
    key: 'crimson',
    label: 'Crimson',
    color: '#70081d',
    colorEnd: '#420410',
  },
  {
    key: 'forest-gold',
    label: 'Forest Gold',
    color: '#004f2f',
    colorEnd: '#ca8a04',
  },
  {
    key: 'royal-gold',
    label: 'Royal Gold',
    color: '#0058a3',
    colorEnd: '#eab308',
  },
  {
    key: 'violet',
    label: 'Violet',
    color: '#6d28d9',
    colorEnd: '#311068',
  },
];

export function formatCardNumber(num) {
  if (!num) return '';
  return num.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export function maskCardNumber(num) {
  if (!num) return '';
  const clean = num.replace(/\s+/g, '');
  if (!clean) return '';
  return `•••• ${clean.slice(-4)}`;
}

const DB_NAME = 'copio_cards_wallet_db_v2';
const STORE_NAME = 'cards';
const LOCAL_STORAGE_KEY = 'copio_cards_wallet_data_v2';

export class WalletStorage {
  #dbPromise = null;

  #initDb() {
    if (typeof indexedDB === 'undefined') return null;
    if (!this.#dbPromise) {
      this.#dbPromise = new Promise((resolve, reject) => {
        try {
          const req = indexedDB.open(DB_NAME, 1);
          req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
          };
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        } catch (err) {
          reject(err);
        }
      }).catch(() => null);
    }
    return this.#dbPromise;
  }

  async getCards() {
    try {
      const db = await this.#initDb();
      if (db) {
        const cards = await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const req = tx.objectStore(STORE_NAME).getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => reject(req.error);
        });
        if (Array.isArray(cards)) {
          return cards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        }
      }
    } catch {}

    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            return parsed.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          }
        }
      }
    } catch {}

    return [];
  }

  async saveCard(card) {
    if (!card || !card.id) return;
    if (!card.createdAt) card.createdAt = Date.now();

    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const req = tx.objectStore(STORE_NAME).put(card);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      }
    } catch {}

    try {
      if (typeof localStorage !== 'undefined') {
        const current = await this.getCards();
        const idx = current.findIndex((c) => c.id === card.id);
        if (idx >= 0) current[idx] = card;
        else current.unshift(card);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}
  }

  async deleteCard(id) {
    if (!id) return;
    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const req = tx.objectStore(STORE_NAME).delete(id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      }
    } catch {}

    try {
      if (typeof localStorage !== 'undefined') {
        const current = (await this.getCards()).filter((c) => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}
  }

  async clearAllCards() {
    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }
    } catch {}

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      }
    } catch {}
  }
}

export const walletStorage = new WalletStorage();

export class CopioCardsApp {
  /** @type {Array<Object>} */
  cards = [];
  searchQuery = '';
  isBrightnessBoostActive = false;
  selectedGradientKey = CARD_GRADIENTS[0].key;
  selectedColor = CARD_GRADIENTS[0].color;
  selectedColorEnd = CARD_GRADIENTS[0].colorEnd;
  /** @type {string|null} */
  scannedCardPhoto = null;
  /** @type {any} */
  scannerElement = null;

  // DOM References
  cardsGrid = null;
  searchInput = null;
  searchClearBtn = null;
  brightnessOverlay = null;
  toastPill = null;
  toastMsg = null;
  addModal = null;
  gradientPickerGrid = null;
  addInputStore = null;
  addColorStart = null;
  addColorEnd = null;
  modalCardPreview = null;
  previewStoreName = null;
  previewCardTier = null;
  previewCardHolder = null;
  previewMaskedNum = null;
  previewBadgeStatus = null;
  addInputNumber = null;
  scannerHost = null;

  async init() {
    this.#cacheDom();
    this.#restoreTheme();
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
    this.gradientPickerGrid = document.getElementById('gradient-picker-grid');
    this.addInputStore = document.getElementById('add-input-store');
    this.addColorStart = document.getElementById('add-color-start');
    this.addColorEnd = document.getElementById('add-color-end');
    this.modalCardPreview = document.getElementById('modal-card-preview');
    this.previewStoreName = document.getElementById('preview-store-name');
    this.previewCardTier = document.getElementById('preview-card-tier');
    this.previewCardHolder = document.getElementById('preview-card-holder');
    this.previewMaskedNum = document.getElementById('preview-masked-num');
    this.previewBadgeStatus = document.getElementById('preview-badge-status');
    this.addInputNumber = document.getElementById('add-input-number');
    this.scannerHost = document.getElementById('modal-scanner-host');
  }

  #restoreTheme() {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('copio_cards_theme') : null;
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
        localStorage.setItem('copio_cards_theme', next);
      }
    } catch {}
  }

  #bindEvents() {
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = /** @type {HTMLInputElement} */ (e.target).value;
        this.searchClearBtn?.classList.toggle('visible', !!this.searchQuery);
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

    document.getElementById('btn-open-add-card')?.addEventListener('click', () => this.openAddModal());
    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.closeAddModal());
    document.getElementById('modal-cancel-btn')?.addEventListener('click', () => this.closeAddModal());
    document.getElementById('modal-save-btn')?.addEventListener('click', () => this.saveNewCard());

    this.addModal?.addEventListener('click', (e) => {
      if (e.target === this.addModal) this.closeAddModal();
    });

    this.addInputStore?.addEventListener('input', () => {
      this.updatePreviewUI();
    });

    this.addColorStart?.addEventListener('input', (e) => {
      this.selectedColor = /** @type {HTMLInputElement} */ (e.target).value;
      this.selectedGradientKey = 'custom';
      this.updatePreviewUI();
    });

    this.addColorEnd?.addEventListener('input', (e) => {
      this.selectedColorEnd = /** @type {HTMLInputElement} */ (e.target).value;
      this.selectedGradientKey = 'custom';
      this.updatePreviewUI();
    });

    this.addInputNumber?.addEventListener('input', () => {
      this.updatePreviewUI();
    });

    window.addEventListener('keydown', (e) => {
      if (
        e.key === '/' &&
        document.activeElement !== this.searchInput &&
        document.activeElement !== this.addInputStore &&
        document.activeElement !== this.addInputNumber &&
        !this.addModal?.classList.contains('open')
      ) {
        e.preventDefault();
        this.searchInput?.focus();
      }
      if (e.key === 'Escape') {
        if (this.addModal?.classList.contains('open')) this.closeAddModal();
        if (this.isBrightnessBoostActive) this.toggleBrightnessBoost(false);
      }
    });

    this.brightnessOverlay?.addEventListener('click', () => this.toggleBrightnessBoost(false));
  }

  async loadCards() {
    this.cards = await walletStorage.getCards();
    this.updateCardCount();
    this.renderCardsGrid();
  }

  updateCardCount() {
    const el = document.getElementById('count-all');
    if (el) {
      el.textContent = String(this.cards.length);
    }
  }

  renderCardsGrid() {
    if (!this.cardsGrid) return;

    if (this.cards.length === 0) {
      this.cardsGrid.innerHTML = `
        <div class="empty-wallet-card">
          <div style="font-size: 42px; line-height: 1;">📇</div>
          <h3 style="font-size: 18px; font-weight: 700;">Your Pocket Wallet is Empty</h3>
          <p style="font-size: 14px; color: var(--color-text-muted); max-width: 420px;">
            Add a loyalty card by entering the card name, choosing a colour gradient background, and taking a photo or uploading a screenshot of the barcode or QR code.
          </p>
          <button type="button" class="btn-action btn-action-primary" id="btn-empty-add-card" style="margin-top: 6px;">
            + Add Loyalty Card
          </button>
        </div>
      `;
      this.cardsGrid.querySelector('#btn-empty-add-card')?.addEventListener('click', () => this.openAddModal());
      return;
    }

    const q = this.searchQuery.toLowerCase().trim();
    const filtered = this.cards.filter((card) => {
      return (
        !q ||
        (card.store && card.store.toLowerCase().includes(q)) ||
        (card.title && card.title.toLowerCase().includes(q)) ||
        (card.number && card.number.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      this.cardsGrid.innerHTML = `
        <div class="empty-wallet-card">
          <div style="font-size: 38px;">🔍</div>
          <h3 style="font-size: 16px; font-weight: 700;">No matching cards</h3>
          <p style="font-size: 13px; color: var(--color-text-muted);">
            No loyalty cards matching "${this.#escapeHtml(this.searchQuery)}".
          </p>
        </div>
      `;
      return;
    }

    this.cardsGrid.innerHTML = filtered
      .map((card) => {
        const isFlipped = !!card.isFlipped;
        const frontStyle = `background: linear-gradient(135deg, ${card.color || '#00539f'}, ${card.colorEnd || card.color || '#002f6c'});`;
        const barcodeImgSrc = card.barcodeImage || card.backImage || card.frontImage || '';

        return `
          <div class="card-3d-wrapper ${isFlipped ? 'is-flipped' : ''}" data-id="${card.id}">
            <div class="card-3d-flipper">
              <!-- FRONT FACE: Custom Brand & Gradient Artwork -->
              <div class="card-face card-face-front" style="${frontStyle}">
                <div class="front-top-row">
                  <div class="store-badge-group">
                    <span class="store-brand-title">${this.#escapeHtml(card.store || 'Loyalty Card')}</span>
                    <span class="store-card-tier">${this.#escapeHtml(card.title || 'Loyalty Card')}</span>
                  </div>
                  <div class="front-actions-group">
                    <span class="flip-pill-hint">↻ Tap to scan</span>
                    <button type="button" class="btn-card-delete-front" data-action="delete" title="Delete card">
                      🗑
                    </button>
                  </div>
                </div>

                <div class="front-mid-row">
                  <div class="card-smart-chip"></div>
                </div>

                <div class="front-bottom-row">
                  <span class="card-holder-name">${this.#escapeHtml(card.holder || card.store?.toUpperCase() || 'LOYALTY CARD')}</span>
                  <span class="card-masked-number">${maskCardNumber(card.number)}</span>
                </div>
              </div>

              <!-- BACK FACE: Scanned Barcode / QR Image for Checkout -->
              <div class="card-face card-face-back">
                <div class="back-top-row">
                  <span class="back-store-name">${this.#escapeHtml(card.store || 'Loyalty Card')}</span>
                  <div class="back-actions-group">
                    <button type="button" class="btn-max-bright ${this.isBrightnessBoostActive ? 'active' : ''}" data-action="bright" title="Screen brightness boost for optical checkouts">
                      ☀ Max Bright
                    </button>
                    <button type="button" class="btn-card-delete" data-action="delete" title="Delete card">
                      🗑
                    </button>
                    <button type="button" class="btn-flip-back" data-action="flip-back" title="Flip to front">
                      ↻ Front
                    </button>
                  </div>
                </div>

                <div class="back-barcode-container">
                  <div class="back-barcode-svg-wrap">
                    ${
                      barcodeImgSrc
                        ? `<img class="back-barcode-img" src="${barcodeImgSrc}" alt="${this.#escapeHtml(card.store || 'Card')} barcode" />`
                        : `<div style="color: #64748b; font-size: 12px; font-weight: 600;">No barcode image</div>`
                    }
                  </div>
                  ${
                    card.number
                      ? `<div class="back-number-text">${this.#escapeHtml(formatCardNumber(card.number))}</div>`
                      : ''
                  }
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    this.cardsGrid.querySelectorAll('.card-3d-wrapper').forEach((wrapper) => {
      const id = wrapper.getAttribute('data-id');

      wrapper.querySelectorAll('button[data-action="delete"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (id) this.deleteCard(id);
        });
      });

      wrapper.querySelectorAll('button[data-action="bright"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleBrightnessBoost();
        });
      });

      wrapper.querySelectorAll('button[data-action="flip-back"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const card = this.cards.find((c) => c.id === id);
          if (!card) return;
          card.isFlipped = false;
          wrapper.classList.remove('is-flipped');
        });
      });

      wrapper.addEventListener('click', (e) => {
        if (/** @type {HTMLElement} */ (e.target).closest('button[data-action]')) {
          return;
        }
        const card = this.cards.find((c) => c.id === id);
        if (!card) return;
        card.isFlipped = !card.isFlipped;
        wrapper.classList.toggle('is-flipped', card.isFlipped);
      });
    });
  }

  toggleBrightnessBoost(forcedState) {
    this.isBrightnessBoostActive = typeof forcedState === 'boolean' ? forcedState : !this.isBrightnessBoostActive;
    this.brightnessOverlay?.classList.toggle('active', this.isBrightnessBoostActive);
    document.querySelectorAll('button[data-action="bright"]').forEach((btn) => {
      btn.classList.toggle('active', this.isBrightnessBoostActive);
    });
    this.showToast(
      this.isBrightnessBoostActive
        ? '☀ Max Brightness active for optical till scanners'
        : 'Brightness restored'
    );
  }

  async deleteCard(id) {
    await walletStorage.deleteCard(id);
    this.cards = this.cards.filter((c) => c.id !== id);
    this.updateCardCount();
    this.renderCardsGrid();
    this.showToast('Card removed from wallet');
  }

  /* ========================================================================
     ADD CARD & EMBEDDED <copio-scanner>
     ======================================================================== */
  openAddModal() {
    this.scannedCardPhoto = null;
    if (this.addInputStore) this.addInputStore.value = '';
    if (this.addInputNumber) this.addInputNumber.value = '';
    this.selectedGradientKey = CARD_GRADIENTS[0].key;
    this.selectedColor = CARD_GRADIENTS[0].color;
    this.selectedColorEnd = CARD_GRADIENTS[0].colorEnd;
    if (this.addColorStart) this.addColorStart.value = this.selectedColor;
    if (this.addColorEnd) this.addColorEnd.value = this.selectedColorEnd;
    if (this.previewBadgeStatus) this.previewBadgeStatus.textContent = 'Custom Gradient ✓';

    this.renderGradientPicker();
    this.updatePreviewUI();
    this.#setupEmbeddedScanner();

    this.addModal?.classList.add('open');
  }

  closeAddModal() {
    this.addModal?.classList.remove('open');
    if (this.scannerElement && typeof this.scannerElement.clear === 'function') {
      this.scannerElement.clear();
    }
  }

  #setupEmbeddedScanner() {
    if (!this.scannerHost) return;

    let scanner = this.scannerHost.querySelector('copio-scanner');
    if (!scanner) {
      scanner = document.createElement('copio-scanner');
      scanner.setAttribute('id', 'wallet-scanner');
      scanner.setAttribute('mode', 'single');
      scanner.setAttribute('aspect', 'card');
      scanner.setAttribute('theme', 'dark');
      scanner.setAttribute('ocr', 'false');
      scanner.setAttribute('pdf', 'false');
      this.scannerHost.appendChild(scanner);

      const updateFromScannerPages = (pages, text = '') => {
        if (Array.isArray(pages) && pages.length > 0) {
          const page = pages[pages.length - 1];
          const imgSrc = page.croppedSrc || page.src || page.originalSrc;
          if (imgSrc) {
            this.scannedCardPhoto = imgSrc;
            if (this.previewBadgeStatus) {
              this.previewBadgeStatus.textContent = 'Barcode Scanned ✓';
            }
          }
        } else {
          this.scannedCardPhoto = null;
          if (this.previewBadgeStatus) {
            this.previewBadgeStatus.textContent = 'Custom Gradient ✓';
          }
        }
        if (text && this.addInputNumber && !this.addInputNumber.value) {
          const digitsMatch = text.replace(/\s+/g, '').match(/\d{8,18}/);
          if (digitsMatch) {
            this.addInputNumber.value = digitsMatch[0];
            if (this.previewMaskedNum) {
              this.previewMaskedNum.textContent = maskCardNumber(digitsMatch[0]);
            }
          }
        }
      };

      scanner.addEventListener('copio:pages-changed', (e) => {
        const detail = /** @type {CustomEvent} */ (e).detail || {};
        updateFromScannerPages(detail.pages || []);
      });

      scanner.addEventListener('copio:page-removed', async () => {
        const pages = typeof scanner.getPages === 'function' ? await scanner.getPages() : [];
        updateFromScannerPages(pages || []);
      });

      scanner.addEventListener('copio:scan-complete', (e) => {
        const detail = /** @type {CustomEvent} */ (e).detail || {};
        const pages = detail.pages || (detail.page ? [detail.page] : []);
        updateFromScannerPages(pages, detail.text || '');
        if (this.scannedCardPhoto) {
          this.showToast('✓ Card photo ready! Tap "Add to Wallet" to save.');
        }
      });
    }

    this.scannerElement = scanner;
  }

  renderGradientPicker() {
    if (!this.gradientPickerGrid) return;

    this.gradientPickerGrid.innerHTML = CARD_GRADIENTS.map((grad) => {
      const isSelected = grad.key === this.selectedGradientKey;
      return `
        <div class="gradient-swatch-option ${isSelected ? 'selected' : ''}" data-key="${grad.key}" data-color="${grad.color}" data-color-end="${grad.colorEnd}">
          <div class="gradient-thumb-badge" style="background: linear-gradient(135deg, ${grad.color}, ${grad.colorEnd});"></div>
          <span class="gradient-thumb-label">${this.#escapeHtml(grad.label)}</span>
        </div>
      `;
    }).join('');

    this.gradientPickerGrid.querySelectorAll('.gradient-swatch-option').forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-key') || CARD_GRADIENTS[0].key;
        const grad = CARD_GRADIENTS.find((g) => g.key === key) || CARD_GRADIENTS[0];
        this.selectedGradientKey = grad.key;
        this.selectedColor = grad.color;
        this.selectedColorEnd = grad.colorEnd;
        if (this.addColorStart) this.addColorStart.value = grad.color;
        if (this.addColorEnd) this.addColorEnd.value = grad.colorEnd;
        this.updatePreviewUI();
      });
    });
  }

  updatePreviewUI() {
    if (this.gradientPickerGrid) {
      this.gradientPickerGrid.querySelectorAll('.gradient-swatch-option').forEach((chip) => {
        chip.classList.toggle('selected', chip.getAttribute('data-key') === this.selectedGradientKey);
      });
    }

    const storeName = this.addInputStore?.value.trim() || 'Card Name';

    if (this.previewStoreName) this.previewStoreName.textContent = storeName;
    if (this.previewCardTier) this.previewCardTier.textContent = 'Loyalty Card';
    if (this.previewCardHolder) this.previewCardHolder.textContent = storeName.toUpperCase();

    if (this.modalCardPreview) {
      this.modalCardPreview.style.backgroundImage = 'none';
      this.modalCardPreview.style.background = `linear-gradient(135deg, ${this.selectedColor}, ${this.selectedColorEnd})`;
    }

    if (this.previewMaskedNum) {
      const val = this.addInputNumber?.value.trim() || '';
      this.previewMaskedNum.textContent = maskCardNumber(val) || '•••• ••••';
    }
  }

  async saveNewCard() {
    // Ensure any active page inside <copio-scanner> is captured even if the user clicked Save directly
    if (!this.scannedCardPhoto && this.scannerElement && typeof this.scannerElement.getPages === 'function') {
      const pages = await this.scannerElement.getPages();
      if (pages && pages.length > 0) {
        const last = pages[pages.length - 1];
        this.scannedCardPhoto = last.croppedSrc || last.src || last.originalSrc || null;
      }
    }

    const storeName = this.addInputStore?.value.trim() || '';
    const num = this.addInputNumber?.value.trim() || '';

    if (!storeName) {
      this.showToast('Please enter a card or brand name');
      this.addInputStore?.focus();
      return null;
    }

    if (!this.scannedCardPhoto && !num) {
      this.showToast('Please take a photo or upload a screenshot of your card');
      return null;
    }

    const newCard = {
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      store: storeName,
      title: 'Loyalty Card',
      number: num,
      color: this.selectedColor || '#00539f',
      colorEnd: this.selectedColorEnd || '#002f6c',
      holder: storeName.toUpperCase(),
      barcodeImage: this.scannedCardPhoto,
      isFlipped: false,
      createdAt: Date.now(),
    };

    await walletStorage.saveCard(newCard);
    this.cards = await walletStorage.getCards();
    this.updateCardCount();
    this.renderCardsGrid();
    this.closeAddModal();
    this.showToast(`Added ${newCard.store} to wallet! ↻ Tap to scan`);
    return newCard;
  }

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

export const copioCardsApp = new CopioCardsApp();

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    copioCardsApp.init();
  });
}
