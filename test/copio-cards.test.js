import { expect } from '@esm-bundle/chai';
import '../vendor/copio/scanner.js';
import {
  CARD_GRADIENTS,
  WalletStorage,
  walletStorage,
  CopioCardsApp,
  formatCardNumber,
  maskCardNumber,
} from '../js/copio-cards-app.js';

describe('Copio Cards — Simple Offline Loyalty Wallet with <copio-scanner> (CPO-047, CPO-048)', () => {
  describe('Card Gradients & Helpers', () => {
    it('starts with no preset brands and provides colour gradient options', () => {
      expect(CARD_GRADIENTS).to.be.an('array').with.lengthOf(8);
      for (const grad of CARD_GRADIENTS) {
        expect(grad).to.have.all.keys('key', 'label', 'color', 'colorEnd');
        expect(grad).to.not.have.property('store');
      }
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
        store: 'My Local Bakery',
        title: 'Loyalty Card',
        color: '#e05a00',
        colorEnd: '#4e1e66',
        barcodeImage:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      });

      let cards = await storage.getCards();
      expect(cards).to.have.lengthOf(1);
      expect(cards[0].store).to.equal('My Local Bakery');

      await storage.deleteCard('card-test-1');
      cards = await storage.getCards();
      expect(cards).to.be.empty;
    });
  });

  describe('CopioCardsApp UI — Custom Brand Input, Gradient Picker, <copio-scanner> & Delete Fix', () => {
    let styleLink;
    let container;
    let app;

    beforeEach(async () => {
      await walletStorage.clearAllCards();

      if (!document.querySelector('link[href*="copio-cards.css"]')) {
        styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/css/copio-cards.css';
        document.head.appendChild(styleLink);
        await new Promise((resolve) => {
          styleLink.onload = resolve;
          styleLink.onerror = resolve;
        });
      }

      container = document.createElement('div');
      container.innerHTML = `
        <div id="brightness-overlay" class="brightness-boost-screen"></div>
        <div class="grid-info-bar">
          <span>Pocket Deck <span id="count-all">0</span></span>
        </div>
        <div class="cards-grid" id="cards-grid"></div>
        <input id="card-search-input" />
        <button id="search-clear-btn"></button>
        <div id="toast-pill"><span id="toast-msg"></span></div>
        <div id="add-modal" class="modal-overlay">
          <div class="modal-sheet">
            <div class="modal-body">
              <input id="add-input-store" />
              <div id="gradient-picker-grid" class="gradient-picker-grid"></div>
              <input type="color" id="add-color-start" value="#00539f" />
              <input type="color" id="add-color-end" value="#002f6c" />
              <div id="modal-scanner-host" class="copio-scanner-host"></div>
              <input id="add-input-number" />
              <div id="modal-card-preview" class="modal-card-preview-container">
                <span id="preview-store-name"></span>
                <span id="preview-card-tier"></span>
                <span id="preview-card-holder"></span>
                <span id="preview-masked-num"></span>
                <span id="preview-badge-status"></span>
              </div>
            </div>
            <button id="modal-close-btn"></button>
            <button id="modal-cancel-btn"></button>
            <button id="modal-save-btn"></button>
          </div>
        </div>
        <button id="btn-theme-toggle"><span id="theme-icon">🌙</span></button>
        <button id="btn-open-add-card"></button>
      `;
      document.body.appendChild(container);

      app = new CopioCardsApp();
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

    it('lets user input custom card name, choose colour gradient, and upload screenshot via <copio-scanner>', async () => {
      app.openAddModal();

      const scanner = container.querySelector('copio-scanner');
      expect(scanner).to.exist;
      expect(scanner.getAttribute('mode')).to.equal('single');
      expect(scanner.getAttribute('aspect')).to.equal('card');

      // User inputs custom brand name
      const storeInput = container.querySelector('#add-input-store');
      storeInput.value = 'Neighborhood Coffee';
      storeInput.dispatchEvent(new Event('input'));
      expect(container.querySelector('#preview-store-name').textContent).to.equal('Neighborhood Coffee');
      expect(container.querySelector('#preview-card-holder').textContent).to.equal('NEIGHBORHOOD COFFEE');

      // User selects Sunset colour gradient swatch
      const sunsetSwatch = container.querySelector('.gradient-swatch-option[data-key="sunset"]');
      expect(sunsetSwatch).to.exist;
      sunsetSwatch.click();
      expect(app.selectedGradientKey).to.equal('sunset');
      expect(app.selectedColor).to.equal('#e05a00');
      expect(app.selectedColorEnd).to.equal('#4e1e66');

      // Simulate uploading a screenshot / taking a photo in <copio-scanner>
      const sampleDataUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      const res = await fetch(sampleDataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'card.png', { type: 'image/png' });
      await scanner.addFiles([file]);

      expect(scanner.stage).to.equal('workbench');
      expect(app.scannedCardPhoto).to.include('data:image/png;base64');
      expect(container.querySelector('#preview-badge-status').textContent).to.equal('Barcode Scanned ✓');

      // Save the card to the wallet
      const saved = await app.saveNewCard();
      expect(saved).to.exist;
      expect(saved.store).to.equal('Neighborhood Coffee');
      expect(saved.color).to.equal('#e05a00');
      expect(saved.colorEnd).to.equal('#4e1e66');
      expect(saved.barcodeImage).to.equal(app.scannedCardPhoto);

      const cardWrapper = container.querySelector('.card-3d-wrapper');
      expect(cardWrapper).to.exist;
      expect(cardWrapper.querySelector('.card-face-front').textContent).to.include('Neighborhood Coffee');

      const backImg = cardWrapper.querySelector('.card-face-back img.back-barcode-img');
      expect(backImg).to.exist;
      expect(backImg.getAttribute('src')).to.include('data:image/png;base64');
    });

    it('flips card 180° in place, toggles ☀ Max Bright, and deletes card via trash icon on flipped back face', async () => {
      app.openAddModal();
      container.querySelector('#add-input-store').value = 'City Gym';
      app.scannedCardPhoto =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      await app.saveNewCard();

      const card = container.querySelector('.card-3d-wrapper');
      expect(card.classList.contains('is-flipped')).to.be.false;

      // Flip card to back face
      card.click();
      expect(card.classList.contains('is-flipped')).to.be.true;

      // Verify hit-testing on flipped back face reaches the delete button and not the hidden front face
      const backDeleteBtn = card.querySelector('.card-face-back button[data-action="delete"]');
      expect(backDeleteBtn).to.exist;
      const rect = backDeleteBtn.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const hitEl = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        expect(hitEl === backDeleteBtn || backDeleteBtn.contains(hitEl)).to.be.true;
      }

      const brightBtn = card.querySelector('button[data-action="bright"]');
      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.true;
      expect(container.querySelector('#brightness-overlay').classList.contains('active')).to.be.true;

      brightBtn.click();
      expect(app.isBrightnessBoostActive).to.be.false;

      // Click delete trash icon on back face and verify card is removed
      backDeleteBtn.click();
      await new Promise((r) => setTimeout(r, 30));
      expect(app.cards).to.be.empty;
      expect(container.querySelectorAll('.card-3d-wrapper')).to.have.lengthOf(0);
    });

    it('filters cards by search query', async () => {
      const dummyImg =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

      app.openAddModal();
      container.querySelector('#add-input-store').value = 'Boots Advantage';
      app.scannedCardPhoto = dummyImg;
      await app.saveNewCard();

      app.openAddModal();
      container.querySelector('#add-input-store').value = 'Costa Club';
      app.scannedCardPhoto = dummyImg;
      await app.saveNewCard();

      expect(container.querySelectorAll('.card-3d-wrapper')).to.have.lengthOf(2);

      app.searchQuery = 'Boots';
      app.renderCardsGrid();
      const visible = container.querySelectorAll('.card-3d-wrapper');
      expect(visible).to.have.lengthOf(1);
      expect(visible[0].textContent).to.include('Boots Advantage');
    });
  });
});
