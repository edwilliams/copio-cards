import { StoragePort } from './storage-port.js';
/**
 * MemoryStorageAdapter — In-memory implementation of StoragePort (CPO-033).
 *
 * Useful for headless testing, Node.js environments, temporary scans,
 * and ephemeral SDK use-cases without browser storage.
 */
export declare class MemoryStorageAdapter extends StoragePort {
    #private;
    constructor();
    /**
     * @returns {Promise<{ kind: string, persistent: boolean }>}
     */
    init(): Promise<{
        kind: string;
        persistent: boolean;
    }>;
    /**
     * Returns list of all stored documents synchronously.
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
     * Retrieves a document by its ID synchronously.
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
     * Deletes a document and its pages.
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
     * Subscribes to document changes.
     * @param {() => void} cb
     * @returns {() => void}
     */
    subscribe(cb: () => void): () => void;
    /**
     * Clears all in-memory data (useful for test isolation).
     */
    clear(): void;
}
