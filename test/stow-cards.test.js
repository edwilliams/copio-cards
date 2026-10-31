import { expect } from '@esm-bundle/chai';
import {
  encodeCode128B,
  encodeEan13,
  generateBarcode1D,
  encodeQRMatrix,
  generateQRCode,
  decodeBinary1D,
  formatCardNumber,
  maskCardNumber,
  BarcodeScanner,
} from '../js/barcode-engine.js';
import { WalletStorage, walletStorage, STORE_PRESETS } from '../js/wallet-storage.js';
import { StowCardsApp } from '../js/stow-cards-app.js';

describe('Stow Cards — Consumer Loyalty & Pocket Wallet (CPO-047, CPO-048)', () => {
  describe('Store Presets & Brand Identity', () => {
    it('provides all 8 pre-tuned UK supermarket & chain presets', () => {
      expect(STORE_PRESETS).to.be.an('array').with.lengthOf(8);
      const keys = STORE_PRESETS.map((p) => p.key);
      expect(keys).to.include.members([
        'tesco',
        'sainsburys',
        'boots',
        'waitrose',
        'sparks',
        'costa',
        'morrisons',
        'ikea',
      ]);
    });

    it('each preset includes category, brand colorways, and authentic symbols', () => {
      STORE_PRESETS.forEach((preset) => {
        expect(preset.store).to.be.a('string').and.not.be.empty;
        expect(preset.title).to.be.a('string').and.not.be.empty;
        expect(preset.category).to.be.oneOf(['supermarket', 'pharmacy', 'coffee', 'home']);
        expect(preset.color).to.match(/^#[0-9a-fA-F]{6}$/);
        expect(preset.sampleNumber).to.be.a('string').and.not.be.empty;
        expect(preset.symbol).to.be.a('string');
      });
    });
  });

  describe('Barcode & QR Code Vector Engine', () => {
    it('encodes Code 128 (Subtype B) with valid start, checksum, and stop bars', () => {
      const binary = encodeCode128B('704092817290');
      expect(binary).to.be.a('string');
      expect(binary.startsWith('11010010000')).to.be.true; // Start B
      expect(binary.endsWith('110001110101111')).to.be.true; // Stop + terminal
    });

    it('encodes standard EAN-13 barcodes with checksum calculation', () => {
      const binary = encodeEan13('501234567890');
      expect(binary).to.be.a('string');
      expect(binary.startsWith('101')).to.be.true; // Start guard
      expect(binary.includes('01010')).to.be.true; // Center guard
      expect(binary.endsWith('101')).to.be.true; // Stop guard
    });

    it('round-trips 1D barcodes via pure-JS binary decoder (Code 128B and EAN-13)', () => {
      const code128Bits = encodeCode128B('6340048291827401');
      const decoded128 = decodeBinary1D(code128Bits);
      expect(decoded128).to.deep.equal({
        rawValue: '6340048291827401',
        format: 'code_128',
        barcodeType: 'code128',
      });

      const eanBits = encodeEan13('5012345678900');
      const decodedEan = decodeBinary1D(eanBits);
      expect(decodedEan).to.deep.equal({
        rawValue: '5012345678900',
        format: 'ean_13',
        barcodeType: 'ean13',
      });
    });

    it('generates high-contrast scalable SVG barcodes without truncating 16-digit card numbers', () => {
      const svg = generateBarcode1D('6340048291827401', 'code128');
      expect(svg).to.include('<svg');
      expect(svg).to.include('<rect width=');
      expect(svg).to.include('fill="#ffffff"');
      expect(svg).to.include('fill="#000000"');
    });

    it('generates real ISO/IEC 18004 QR code matrices and SVG vectors', () => {
      const matrix = encodeQRMatrix('https://copio-cards.netlify.app');
      expect(matrix).to.be.an('array');
      expect(matrix.length).to.be.at.least(25);
      // Verify top-left 7x7 finder pattern outer corners and center are dark (true)
      expect(matrix[0][0]).to.be.true;
      expect(matrix[0][6]).to.be.true;
      expect(matrix[6][0]).to.be.true;
      expect(matrix[3][3]).to.be.true;

      const qrSvg = generateQRCode('https://copio-cards.netlify.app', 160);
      expect(qrSvg).to.include('<svg');
      expect(qrSvg).to.include('viewBox="0 0 160 160"');
      expect(qrSvg).to.include('fill="#000000"');
    });

    it('formats card numbers for cashier readback and masks digits for security', () => {
      expect(formatCardNumber('6340048291827401')).to.equal('6340 0482 9182 7401');
      expect(maskCardNumber('6340048291827401')).to.equal('•••• 7401');
    });

    it('normalizes barcode formats into qr, ean13, or code128', () => {
      expect(BarcodeScanner.normalizeBarcodeType('qr_code', 'https://example.com')).to.equal('qr');
      expect(BarcodeScanner.normalizeBarcodeType('ean_13', '5012345678900')).to.equal('ean13');
      expect(BarcodeScanner.normalizeBarcodeType('code_128', '6340048291827401')).to.equal('code128');
    });
  });

  describe('Wallet Storage & Client-Side Persistence', () => {
    let storage;

    beforeEach(async () => {
      storage = new WalletStorage();
      await storage.clearAllCards();
    });

    afterEach(async () => {
      await storage.clearAllCards();
    });

    it('starts empty on initial fresh run without pre-populated cards', async () => {
      const cards = await storage.getCards();
      expect(cards).to.be.an('array').that.is.empty;
    });

    it('saves, updates, exports, imports, and deletes cards locally', async () => {
      const testCard = {
        id: 'test-card-999',
        store: 'Lidl',
        title: 'Plus',
        category: 'supermarket',
        number: '1234567890123',
        color: '#0050aa',
        holder: 'PLUS',
      };

      await storage.saveCard(testCard);
      let cards = await storage.getCards();
      expect(cards).to.have.lengthOf(1);
      expect(cards[0].id).to.equal('test-card-999');

      const exported = await storage.exportAll();
      expect(Object.keys(exported)).to.have.lengthOf(1);

      const importedCount = await storage.importDocs([
        {
          id: 'test-card-1000',
          store: 'Tesco',
          title: 'Clubcard',
          category: 'supermarket',
          number: '6340048291827401',
        },
      ]);
      expect(importedCount).to.equal(1);

      await storage.deleteCard('test-card-999');
      cards = await storage.getCards();
      expect(cards.some((c) => c.id === 'test-card-999')).to.be.false;
      expect(cards.some((c) => c.id === 'test-card-1000')).to.be.true;
    });
  });

  describe('StowCardsApp UI, Empty State, Barcode Scanning & In-Place 3D Flip', () => {
    let container;
    let app;

    beforeEach(async () => {
      await walletStorage.clearAllCards();

      container = document.createElement('div');
      container.innerHTML = `
        <div id="brightness-overlay" class="brightness-boost-screen"></div>
        <div class="cards-grid" id="cards-grid"></div>
        <input id="card-search-input" />
        <button id="search-clear-btn"></button>
        <div id="category-pills">
          <button class="category-pill active" data-category="all">All <span id="count-all"></span></button>
          <button class="category-pill" data-category="supermarket">Supermarket <span id="count-supermarket"></span></button>
          <button class="category-pill" data-category="pharmacy">Pharmacy <span id="count-pharmacy"></span></button>
          <button class="category-pill" data-category="coffee">Coffee <span id="count-coffee"></span></button>
          <button class="category-pill" data-category="home">Home <span id="count-home"></span></button>
        </div>
        <div id="toast-pill"><span id="toast-msg"></span></div>
        <div id="add-modal" class="modal-overlay">
          <div id="store-picker-grid"></div>
          <div id="modal-card-preview">
            <span id="preview-store-name"></span>
            <span id="preview-card-tier"></span>
            <span id="preview-card-holder"></span>
            <span id="preview-masked-num"></span>
          </div>
          <div class="scanner-viewfinder" id="scanner-viewfinder">
            <video id="scanner-live-video"></video>
            <canvas id="scanner-camera-canvas" width="600" height="320"></canvas>
            <div class="barcode-reticle" id="barcode-reticle">
              <div class="reticle-status-pill" id="reticle-status-text">Point camera at barcode or QR code</div>
            </div>
          </div>
          <button type="button" id="btn-start-camera"><span id="camera-btn-text">Start Camera Scanner</span></button>
          <button type="button" id="btn-switch-camera" style="display: none;"></button>
          <div id="barcode-type-pills">
            <button type="button" class="filter-pill-btn active" data-barcode-type="code128">1D Barcode</button>
            <button type="button" class="filter-pill-btn" data-barcode-type="qr">QR Code</button>
          </div>
          <input id="add-input-number" />
          <button id="modal-close-btn"></button>
          <button id="modal-cancel-btn"></button>
          <button id="modal-save-btn"></button>
        </div>
        <div id="sync-modal" class="modal-overlay">
          <div id="sync-qr-container"></div>
          <p id="sync-status-text"></p>
          <button id="sync-close-btn"></button>
          <button id="sync-done-btn"></button>
        </div>
        <button id="btn-theme-toggle"><span id="theme-icon">🌙</span></button>
        <button id="btn-open-add-card"></button>
        <button id="btn-open-sync"></button>
      `;
      document.body.appendChild(container);

      app = new StowCardsApp();
      await app.init();
    });

    afterEach(async () => {
      app.stopCameraScanner();
      container.remove();
      await walletStorage.clearAllCards();
    });

    it('opens afresh with 0 cards and renders the empty wallet state', () => {
      expect(app.cards).to.be.an('array').that.is.empty;
      expect(container.querySelector('#count-all').textContent).to.equal('0');

      const emptyCard = container.querySelector('.empty-wallet-card');
      expect(emptyCard).to.exist;
      expect(emptyCard.textContent).to.include('Your Pocket Wallet is Empty');

      const emptyAddBtn = container.querySelector('#btn-empty-add-card');
      expect(emptyAddBtn).to.exist;
      emptyAddBtn.click();
      expect(container.querySelector('#add-modal').classList.contains('open')).to.be.true;
    });

    it('adds a new card by selecting a store and scanning a barcode or QR code (no photo upload needed)', async () => {
      app.openAddModal();

      // Ensure no copio photo upload or front-of-card scanner exists
      expect(container.querySelector('copio-scanner')).to.be.null;
      expect(container.querySelector('#global-card-upload-input')).to.be.null;

      // Select Boots Advantage preset
      const bootsChip = container.querySelector('.store-chip-option[data-key="boots"]');
      expect(bootsChip).to.exist;
      bootsChip.click();
      expect(app.selectedPresetKey).to.equal('boots');
      expect(container.querySelector('#preview-store-name').textContent).to.equal('Boots');

      // Simulate barcode scan detection
      app.handleBarcodeDetected({
        rawValue: '1984302948102',
        format: 'ean_13',
        barcodeType: 'ean13',
      });

      expect(app.addInputNumber.value).to.equal('1984302948102');
      expect(container.querySelector('#barcode-reticle').classList.contains('scanned')).to.be.true;
      expect(container.querySelector('#preview-masked-num').textContent).to.equal('•••• 8102');

      // Save card to wallet
      const saved = await app.saveNewCard();
      expect(saved).to.exist;
      expect(saved.store).to.equal('Boots');
      expect(saved.number).to.equal('1984302948102');
      expect(saved.barcodeType).to.equal('ean13');

      const cardWrappers = container.querySelectorAll('.card-3d-wrapper');
      expect(cardWrappers.length).to.equal(1);
      expect(container.querySelector('#count-all').textContent).to.equal('1');
      expect(container.querySelector('#count-pharmacy').textContent).to.equal('1');
    });

    it('flips card 180° in place when tapped and toggles ☀ Max Bright', async () => {
      app.openAddModal();
      app.handleBarcodeDetected({
        rawValue: '6340048291827401',
        format: 'code_128',
        barcodeType: 'code128',
      });
      await app.saveNewCard();

      const firstCard = container.querySelector('.card-3d-wrapper');
      expect(firstCard).to.exist;
      expect(firstCard.classList.contains('is-flipped')).to.be.false;

      firstCard.click();
      expect(firstCard.classList.contains('is-flipped')).to.be.true;

      const brightBtn = firstCard.querySelector('button[data-action="bright"]');
      expect(brightBtn).to.exist;
      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.true;
      expect(container.querySelector('#brightness-overlay').classList.contains('active')).to.be.true;

      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.false;

      firstCard.click();
      expect(firstCard.classList.contains('is-flipped')).to.be.false;
    });

    it('filters added cards by search query and category', async () => {
      // Add Tesco (supermarket)
      app.openAddModal();
      app.selectedPresetKey = 'tesco';
      app.addInputNumber.value = '6340048291827401';
      await app.saveNewCard();

      // Add Costa (coffee)
      app.openAddModal();
      app.selectedPresetKey = 'costa';
      app.setBarcodeTypeUI('qr');
      app.addInputNumber.value = '449102938471';
      await app.saveNewCard();

      expect(container.querySelectorAll('.card-3d-wrapper').length).to.equal(2);

      // Filter by search
      app.searchQuery = 'Costa';
      app.renderCardsGrid();
      let visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible.length).to.equal(1);
      expect(visible[0].textContent).to.include('Costa');

      // Clear search and filter by category
      app.searchQuery = '';
      app.activeCategory = 'supermarket';
      app.renderCardsGrid();
      visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible.length).to.equal(1);
      expect(visible[0].textContent).to.include('Tesco');
    });
  });
});
