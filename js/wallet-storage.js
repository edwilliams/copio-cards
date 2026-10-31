/**
 * Wallet Storage Service
 * Provides offline-first client-side card persistence via IndexedDB with LocalStorage fallback.
 * Zero telemetry, zero cloud accounts, 100% private to device.
 */

export const STORE_PRESETS = [
  {
    key: 'tesco',
    store: 'Tesco',
    title: 'Clubcard',
    category: 'supermarket',
    color: '#00539f',
    colorEnd: '#002f6c',
    barcodeType: 'ean13',
    symbol: '🛒',
    sampleNumber: '6340048291827401'
  },
  {
    key: 'sainsburys',
    store: "Sainsbury's",
    title: 'Nectar',
    category: 'supermarket',
    color: '#e05a00',
    colorEnd: '#4e1e66',
    barcodeType: 'code128',
    symbol: '🍇',
    sampleNumber: '98263004827103'
  },
  {
    key: 'boots',
    store: 'Boots',
    title: 'Advantage Card',
    category: 'pharmacy',
    color: '#004b91',
    colorEnd: '#00254d',
    barcodeType: 'code128',
    symbol: '💊',
    sampleNumber: '704092817290'
  },
  {
    key: 'waitrose',
    store: 'Waitrose',
    title: 'myWaitrose',
    category: 'supermarket',
    color: '#025826',
    colorEnd: '#013316',
    barcodeType: 'code128',
    symbol: '🌿',
    sampleNumber: '290184719284'
  },
  {
    key: 'sparks',
    store: 'Marks & Spencer',
    title: 'Sparks',
    category: 'supermarket',
    color: '#111111',
    colorEnd: '#242424',
    barcodeType: 'qr',
    symbol: '✨',
    sampleNumber: 'MS-SPARKS-91827402'
  },
  {
    key: 'costa',
    store: 'Costa Coffee',
    title: 'Costa Club',
    category: 'coffee',
    color: '#70081d',
    colorEnd: '#420410',
    barcodeType: 'qr',
    symbol: '☕',
    sampleNumber: 'COSTA-CLUB-55291039'
  },
  {
    key: 'morrisons',
    store: 'Morrisons',
    title: 'Morrisons More',
    category: 'supermarket',
    color: '#004f2f',
    colorEnd: '#ffbe00',
    barcodeType: 'code128',
    symbol: '🌲',
    sampleNumber: '882019482719'
  },
  {
    key: 'ikea',
    store: 'IKEA',
    title: 'IKEA Family',
    category: 'home',
    color: '#0058a3',
    colorEnd: '#ffcc00',
    barcodeType: 'code128',
    symbol: '🏡',
    sampleNumber: '192847102938'
  }
];

const DB_NAME = 'stow_cards_wallet_db';
const STORE_NAME = 'cards';
const DB_VERSION = 1;
const LOCAL_STORAGE_KEY = 'stow_cards_wallet_data_v1';

export class WalletStorage {
  #dbPromise = null;

  constructor() {
    this.#initDb();
  }

  #initDb() {
    if (typeof indexedDB === 'undefined') {
      return null;
    }
    if (!this.#dbPromise) {
      this.#dbPromise = new Promise((resolve, reject) => {
        try {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
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
      }).catch((err) => {
        console.warn('[WalletStorage] IndexedDB unavailable, falling back to LocalStorage:', err);
        return null;
      });
    }
    return this.#dbPromise;
  }

  /**
   * Initializes default card set from presets
   * @returns {Array<Object>}
   */
  getDefaultCards() {
    return STORE_PRESETS.map((p, idx) => ({
      id: `card-${idx + 1}`,
      store: p.store,
      title: p.title,
      category: p.category,
      number: p.sampleNumber,
      barcodeType: p.barcodeType,
      color: p.color,
      colorEnd: p.colorEnd,
      symbol: p.symbol,
      holder: 'ED WILLIAMS',
      frontImage: null,
      backImage: null,
      isFlipped: false,
      createdAt: Date.now() - (10 - idx) * 3600000,
    }));
  }

  /**
   * Loads all cards from storage
   * @returns {Promise<Array<Object>>}
   */
  async getCards() {
    try {
      const db = await this.#initDb();
      if (db) {
        const cards = await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => reject(req.error);
        });

        if (cards && cards.length > 0) {
          // Sort by creation or position
          return cards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        }
      }
    } catch (err) {
      console.warn('[WalletStorage] Failed to read from IndexedDB, trying localStorage:', err);
    }

    // Fallback: LocalStorage
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch {}

    // First run: save & return default presets
    const defaults = this.getDefaultCards();
    await this.saveAllCards(defaults);
    return defaults;
  }

  /**
   * Saves or updates a single card
   * @param {Object} card
   * @returns {Promise<void>}
   */
  async saveCard(card) {
    if (!card || !card.id) return;
    if (!card.createdAt) card.createdAt = Date.now();

    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.put(card);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      }
    } catch (err) {
      console.warn('[WalletStorage] Failed to put into IndexedDB:', err);
    }

    // Sync to LocalStorage mirror
    try {
      if (typeof localStorage !== 'undefined') {
        const current = await this.getCards();
        const existingIdx = current.findIndex(c => c.id === card.id);
        if (existingIdx >= 0) {
          current[existingIdx] = card;
        } else {
          current.unshift(card);
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}
  }

  /**
   * Bulk saves all cards
   * @param {Array<Object>} cards
   * @returns {Promise<void>}
   */
  async saveAllCards(cards) {
    if (!Array.isArray(cards)) return;

    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.clear();
          for (const card of cards) {
            store.put(card);
          }
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }
    } catch (err) {
      console.warn('[WalletStorage] Failed bulk save to IndexedDB:', err);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
      }
    } catch {}
  }

  /**
   * Deletes a card by ID
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteCard(id) {
    if (!id) return;

    try {
      const db = await this.#initDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.delete(id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      }
    } catch (err) {
      console.warn('[WalletStorage] Failed delete from IndexedDB:', err);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        const current = (await this.getCards()).filter(c => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}
  }

  /**
   * Resets wallet to the default UK presets
   * @returns {Promise<Array<Object>>}
   */
  async resetToDefaults() {
    const defaults = this.getDefaultCards();
    await this.saveAllCards(defaults);
    return defaults;
  }
}

export const walletStorage = new WalletStorage();
