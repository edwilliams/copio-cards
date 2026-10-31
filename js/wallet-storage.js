/**
 * Wallet Storage Service
 * Provides offline-first client-side card persistence via IndexedDB with LocalStorage fallback.
 * Opens afresh with an empty wallet until the user adds their own loyalty cards.
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
    barcodeType: 'code128',
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

const DB_NAME = 'stow_cards_wallet_db_v2';
const STORE_NAME = 'cards';
const DB_VERSION = 1;
const LOCAL_STORAGE_KEY = 'stow_cards_wallet_data_v2';

export class WalletStorage {
  #dbPromise = null;
  #listeners = new Set();

  constructor() {
    this.#initDb();
  }

  /**
   * Subscribe to wallet card changes (e.g. after P2P sync import)
   * @param {() => void} fn
   * @returns {() => void}
   */
  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }

  #notify() {
    for (const fn of this.#listeners) {
      try {
        fn();
      } catch {
        // ignore listener error
      }
    }
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
   * Loads all user-added cards from storage.
   * Returns an empty array [] on fresh start — no pre-seeded sample cards.
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

        if (Array.isArray(cards)) {
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
          if (Array.isArray(parsed)) {
            return parsed.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          }
        }
      }
    } catch {}

    return [];
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
        const existingIdx = current.findIndex((c) => c.id === card.id);
        if (existingIdx >= 0) {
          current[existingIdx] = card;
        } else {
          current.unshift(card);
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}

    this.#notify();
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

    this.#notify();
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
        const current = (await this.getCards()).filter((c) => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
      }
    } catch {}

    this.#notify();
  }

  /**
   * Clears all cards from the wallet
   * @returns {Promise<void>}
   */
  async clearAllCards() {
    await this.saveAllCards([]);
  }

  /**
   * Exports all cards for P2P Sync
   * @returns {Promise<Record<string, Object>>}
   */
  async exportAll() {
    const cards = await this.getCards();
    /** @type {Record<string, Object>} */
    const map = {};
    for (const card of cards) {
      if (card && card.id) {
        map[card.id] = card;
      }
    }
    return map;
  }

  /**
   * Imports cards received from P2P Sync
   * @param {Record<string, Object> | Array<Object>} incoming
   * @returns {Promise<number>} Count of newly added cards
   */
  async importDocs(incoming) {
    if (!incoming) return 0;
    const current = await this.getCards();
    const existingIds = new Set(current.map((c) => c.id));
    const list = Array.isArray(incoming) ? incoming : Object.values(incoming);

    let added = 0;
    for (const item of list) {
      if (item && item.id && item.store && item.number) {
        if (!existingIds.has(item.id)) {
          added++;
          existingIds.add(item.id);
          current.push({ ...item, isFlipped: false });
        }
      }
    }

    if (added > 0) {
      await this.saveAllCards(current);
    }
    return added;
  }
}

export const walletStorage = new WalletStorage();
