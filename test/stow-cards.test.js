import { expect } from '@esm-bundle/chai';
import '../dist/scanner.js';
import {
  STORE_PRESETS,
  WalletStorage,
  walletStorage,
  StowCardsApp,
  formatCardNumber,
  maskCardNumber,
} from '../js/stow-cards-app.js';

describe('Stow Cards — Simple Offline Loyalty Wallet with <copio-scanner> (CPO-047, CPO-048)', () => {
  describe('Store Presets & Helpers', () => {
    it('provides all 8 UK supermarket & chain presets', () => {
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

    it('formats and masks optional card numbers', () => {
      expect(formatCardNumber('6340048291827401')).to.equal('6340 0482 9182 7401');
      expect(maskCardNumber('6340048291827401')).to.equal('•••• 7401');
    });
  });

  describe('WalletStorage — Fresh Start & Offline Persistence', () => {
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

    it('saves and deletes cards locally', async () => {
      await storage.saveCard({
        id: 'card-test-1',
        store: 'Tesco',
        title: 'Clubcard',
        category: 'supermarket',
        barcodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      });

      let cards = await storage.getCards();
      expect(cards).to.have.lengthOf(1);
      expect(cards[0].store).to.equal('Tesco');

      await storage.deleteCard('card-test-1');
      cards = await storage.getCards();
      expect(cards).to.be.empty;
    });
  });

  describe('StowCardsApp UI & <copio-scanner> Card Photo / Screenshot Workflow', () => {
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
          <div id="modal-scanner-host" class="copio-scanner-host"></div>
          <input id="add-input-number" />
          <div id="modal-card-preview">
            <span id="preview-store-name"></span>
            <span id="preview-card-tier"></span>
            <span id="preview-card-holder"></span>
            <span id="preview-masked-num"></span>
            <span id="preview-badge-status"></span>
          </div>
          <button id="modal-close-btn"></button>
          <button id="modal-cancel-btn"></button>
          <button id="modal-save-btn"></button>
        </div>
        <button id="btn-theme-toggle"><span id="theme-icon">🌙</span></button>
        <button id="btn-open-add-card"></button>
      `;
      document.body.appendChild(container);

      app = new StowCardsApp();
      await app.init();
    });

    afterEach(async () => {
      container.remove();
      await walletStorage.clearAllCards();
    });

    it('opens afresh with 0 cards and renders the empty wallet state', () => {
      expect(app.cards).to.be.an('array').that.is.empty;
      expect(container.querySelector('#count-all').textContent).to.equal('0');

      const emptyCard = container.querySelector('.empty-wallet-card');
      expect(emptyCard).to.exist;
      expect(emptyCard.textContent).to.include('Your Pocket Wallet is Empty');
    });

    it('embeds <copio-scanner> to capture or upload a card screenshot and renders it on the back of the card', async () => {
      app.openAddModal();

      const scanner = container.querySelector('copio-scanner');
      expect(scanner).to.exist;
      expect(scanner.getAttribute('mode')).to.equal('single');
      expect(scanner.getAttribute('aspect')).to.equal('card');

      // Choose Sainsbury's Nectar preset
      const nectarChip = container.querySelector('.store-chip-option[data-key="sainsburys"]');
      expect(nectarChip).to.exist;
      nectarChip.click();
      expect(app.selectedPresetKey).to.equal('sainsburys');

      // Simulate uploading a screenshot / taking a photo in <copio-scanner>
      const sampleDataUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      scanner.dispatchEvent(
        new CustomEvent('copio:scan-complete', {
          bubbles: true,
          composed: true,
          detail: {
            pages: [{ id: 'p1', src: sampleDataUrl }],
          },
        })
      );

      expect(app.scannedCardPhoto).to.equal(sampleDataUrl);
      expect(container.querySelector('#preview-badge-status').textContent).to.equal('Barcode Scanned ✓');

      // Save the card to the wallet
      const saved = await app.saveNewCard();
      expect(saved).to.exist;
      expect(saved.store).to.equal("Sainsbury's");
      expect(saved.barcodeImage).to.equal(sampleDataUrl);

      // Verify the card renders in the grid with store front artwork and the scanned photo on the back
      const cardWrapper = container.querySelector('.card-3d-wrapper');
      expect(cardWrapper).to.exist;
      expect(cardWrapper.querySelector('.card-face-front').textContent).to.include("Sainsbury's");

      const backImg = cardWrapper.querySelector('.card-face-back img.back-barcode-img');
      expect(backImg).to.exist;
      expect(backImg.getAttribute('src')).to.equal(sampleDataUrl);
    });

    it('flips card 180° in place to reveal scanned barcode photo and toggles ☀ Max Bright', async () => {
      app.openAddModal();
      app.scannedCardPhoto =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      await app.saveNewCard();

      const card = container.querySelector('.card-3d-wrapper');
      expect(card.classList.contains('is-flipped')).to.be.false;

      card.click();
      expect(card.classList.contains('is-flipped')).to.be.true;

      const brightBtn = card.querySelector('button[data-action="bright"]');
      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.true;
      expect(container.querySelector('#brightness-overlay').classList.contains('active')).to.be.true;

      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.false;
    });

    it('filters cards by search query and category', async () => {
      const dummyImg =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

      app.openAddModal();
      app.selectedPresetKey = 'boots';
      app.scannedCardPhoto = dummyImg;
      await app.saveNewCard();

      app.openAddModal();
      app.selectedPresetKey = 'costa';
      app.scannedCardPhoto = dummyImg;
      await app.saveNewCard();

      expect(container.querySelectorAll('.card-3d-wrapper')).to.have.lengthOf(2);

      app.searchQuery = 'Boots';
      app.renderCardsGrid();
      let visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible).to.have.lengthOf(1);
      expect(visible[0].textContent).to.include('Boots');

      app.searchQuery = '';
      app.activeCategory = 'coffee';
      app.renderCardsGrid();
      visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible).to.have.lengthOf(1);
      expect(visible[0].textContent).to.include('Costa');
    });
  });
});
