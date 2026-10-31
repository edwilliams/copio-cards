import { StoragePort } from './storage-port.js';
/**
 * IndexedDbStorageAdapter — TinyBase IndexedDB implementation of StoragePort (CPO-033).
 *
 * Wraps TinyBase and IndexedDbPersister behind the StoragePort contract, ensuring
 * existing database data ('copio-db') is preserved while isolating storage mechanics.
 */
export declare class IndexedDbStorageAdapter extends StoragePort {
    #private;
    /**
     * @param {Object} [options]
     * @param {any} [options.store] - Optional TinyBase store instance
     * @param {any} [options.persister] - Optional TinyBase persister instance
     * @param {string} [options.dbName] - Custom IndexedDB database name
     */
    constructor(options?: {
        store?: any;
        persister?: any;
        dbName?: string;
    });
    get store(): any;
    get persister(): any;
    /**
     * @returns {Promise<{ kind: string, persistent: boolean }>}
     */
    init(): Promise<{
        kind: string;
        persistent: boolean;
    }>;
    /**
     * Returns list of all stored documents synchronously from the TinyBase cache.
     * @returns {Array<{ id: string, name: string, pages: any[] }>}
     */
    listDocsSync(): Array<{
        id: string;
        name: string;
        pages: any[];
    }>;
    /**
     * Returns list of all stored documents.
     * @returns {Promise<Array<{ id: string, name: string, pages: any[] }>>}
     */
    listDocs(): Promise<Array<{
        id: string;
        name: string;
        pages: any[];
    }>>;
    /**
     * Retrieves a document by its ID synchronously from the TinyBase cache.
     * @param {string} id
     * @returns {{ id: string, name: string, pages: any[] } | null}
     */
    getDocSync(id: string): {
        id: string;
        name: string;
        pages: any[];
    } | null;
    /**
     * Retrieves a document by its ID.
     * @param {string} id
     * @returns {Promise<{ id: string, name: string, pages: any[] } | null>}
     */
    getDoc(id: string): Promise<{
        id: string;
        name: string;
        pages: any[];
    } | null>;
    /**
     * Saves or updates a document.
     * @param {string} id
     * @param {import('./storage-port.js').DocRow} doc
     * @returns {Promise<void>}
     */
    saveDoc(id: string, doc: import('./storage-port.js').DocRow): Promise<void>;
    /**
     * Deletes a document.
     * @param {string} id
     * @returns {Promise<void>}
     */
    deleteDoc(id: string): Promise<void>;
    /**
     * Saves page data for a document.
     * @param {string} docId
     * @param {string} pageId
     * @param {any} blobOrData
     * @returns {Promise<void>}
     */
    savePage(docId: string, pageId: string, blobOrData: any): Promise<void>;
    /**
     * Retrieves page data.
     * @param {string} docId
     * @param {string} pageId
     * @returns {Promise<any>}
     */
    getPage(docId: string, pageId: string): Promise<any>;
    /**
     * Deletes page data.
     * @param {string} docId
     * @param {string} pageId
     * @returns {Promise<void>}
     */
    deletePage(docId: string, pageId: string): Promise<void>;
    /**
     * Subscribes to document changes via TinyBase table listener.
     * @param {() => void} cb
     * @returns {() => void} Unsubscribe function
     */
    subscribe(cb: () => void): () => void;
}
