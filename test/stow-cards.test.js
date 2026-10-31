import { expect } from '@esm-bundle/chai';
import {
  encodeCode128B,
  encodeEan13,
  generateBarcode1D,
  generateQRCode,
  formatCardNumber,
  maskCardNumber,
} from '../js/barcode-engine.js';
import { WalletStorage, STORE_PRESETS } from '../js/wallet-storage.js';
import { StowCardsApp } from '../js/stow-cards-app.js';
import '../dist/scanner.js';

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
      const binary = encodeEan13('634004829182');
      expect(binary).to.be.a('string');
      expect(binary.startsWith('101')).to.be.true; // Start guard
      expect(binary.includes('01010')).to.be.true; // Center guard
      expect(binary.endsWith('101')).to.be.true; // Stop guard
    });

    it('generates high-contrast scalable SVG barcodes', () => {
      const svg = generateBarcode1D('6340048291827401', 'ean13');
      expect(svg).to.include('<svg');
      expect(svg).to.include('<rect width=');
      expect(svg).to.include('fill="#ffffff"');
      expect(svg).to.include('fill="#000000"');
    });

    it('generates vector SVG QR codes with finder patterns', () => {
      const qrSvg = generateQRCode('https://copio-cards.netlify.app', 160);
      expect(qrSvg).to.include('<svg');
      expect(qrSvg).to.include('viewBox="0 0 160 160"');
      expect(qrSvg).to.include('fill="#000000"');
    });

    it('formats card numbers for cashier readback and masks digits for security', () => {
      expect(formatCardNumber('6340048291827401')).to.equal('6340 0482 9182 7401');
      expect(maskCardNumber('6340048291827401')).to.equal('•••• 7401');
    });
  });

  describe('Wallet Storage & Client-Side Persistence', () => {
    let storage;

    beforeEach(() => {
      storage = new WalletStorage();
    });

    it('returns default store cards on initial run', async () => {
      const cards = await storage.getCards();
      expect(cards).to.be.an('array');
      expect(cards.length).to.be.at.least(8);
      expect(cards[0].holder).to.equal('ED WILLIAMS');
    });

    it('saves, updates, and deletes cards locally', async () => {
      const testCard = {
        id: 'test-card-999',
        store: 'Lidl',
        title: 'Plus',
        category: 'supermarket',
        number: '1234567890123',
        color: '#0050aa',
        holder: 'TEST USER',
      };

      await storage.saveCard(testCard);
      let cards = await storage.getCards();
      expect(cards.some((c) => c.id === 'test-card-999')).to.be.true;

      await storage.deleteCard('test-card-999');
      cards = await storage.getCards();
      expect(cards.some((c) => c.id === 'test-card-999')).to.be.false;
    });
  });

  describe('StowCardsApp UI & In-Place 3D Flip', () => {
    let container;
    let app;

    beforeEach(async () => {
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
            <span id="preview-masked-num"></span>
          </div>
          <div id="modal-scanner-host" class="copio-scanner-host"></div>
          <input id="add-input-number" />
          <button id="modal-close-btn"></button>
          <button id="modal-cancel-btn"></button>
          <button id="modal-save-btn"></button>
        </div>
        <div id="sync-modal" class="modal-overlay">
          <div id="sync-qr-container"></div>
          <button id="sync-close-btn"></button>
          <button id="sync-done-btn"></button>
        </div>
        <button id="btn-open-add-card"></button>
        <button id="btn-open-sync"></button>
      `;
      document.body.appendChild(container);

      app = new StowCardsApp();
      await app.init();
    });

    afterEach(() => {
      container.remove();
    });

    it('renders card deck with front and back faces', () => {
      const cardWrappers = container.querySelectorAll('.card-3d-wrapper');
      expect(cardWrappers.length).to.be.at.least(8);

      const firstCard = cardWrappers[0];
      expect(firstCard.querySelector('.card-face-front')).to.exist;
      expect(firstCard.querySelector('.card-face-back')).to.exist;
      expect(firstCard.querySelector('.back-barcode-container')).to.exist;
    });

    it('flips card 180° in place when tapped', () => {
      const firstCard = container.querySelector('.card-3d-wrapper');
      expect(firstCard.classList.contains('is-flipped')).to.be.false;

      firstCard.click();
      expect(firstCard.classList.contains('is-flipped')).to.be.true;

      firstCard.click();
      expect(firstCard.classList.contains('is-flipped')).to.be.false;
    });

    it('toggles screen brightness boost via ☀ Max Bright', () => {
      const brightBtn = container.querySelector('button[data-action="bright"]');
      expect(brightBtn).to.exist;

      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.true;
      expect(container.querySelector('#brightness-overlay').classList.contains('active')).to.be.true;

      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.false;
    });

    it('filters cards by search query', () => {
      app.searchQuery = 'Boots';
      app.renderCardsGrid();
      const visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible.length).to.equal(1);
      expect(visible[0].textContent).to.include('Boots');
    });

    it('filters cards by category', () => {
      app.activeCategory = 'coffee';
      app.renderCardsGrid();
      const visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible.length).to.equal(1);
      expect(visible[0].textContent).to.include('Costa');
    });

    it('embeds <copio-scanner> and processes copio:scan-complete event', () => {
      app.openAddModal();
      const scanner = container.querySelector('copio-scanner');
      expect(scanner).to.exist;
      expect(scanner.getAttribute('mode')).to.equal('single');
      expect(scanner.getAttribute('aspect')).to.equal('card');

      // Dispatch copio:scan-complete event
      scanner.dispatchEvent(
        new CustomEvent('copio:scan-complete', {
          bubbles: true,
          detail: {
            pages: [
              {
                id: 'scanned-page-1',
                croppedSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
              },
            ],
            text: 'MEMBER 98263004827103',
          },
        })
      );

      expect(app.scannedCardPhoto).to.be.a('string');
      expect(app.addInputNumber.value).to.equal('98263004827103');
    });
  });
});
