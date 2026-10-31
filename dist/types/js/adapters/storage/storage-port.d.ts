/**
 * StoragePort — Outbound/Driven Port for Data Persistence (Hexagonal Architecture / CPO-033).
 *
 * Defines the contract that all storage adapters (IndexedDB, Memory, OPFS, custom cloud)
 * must implement. Decouples the domain logic and UI from specific storage backends.
 */
export type StorageInitResult = {
    /**
     * - Adapter identifier ('memory' | 'indexeddb' | 'opfs' | string)
     */
    kind: string;
    /**
     * - Whether storage persists across page reloads/sessions
     */
    persistent: boolean;
};
export type DocRow = {
    /**
     * - Unique document identifier
     */
    id?: string;
    /**
     * - Document title
     */
    name?: string;
    /**
     * - Document pages array (or serialized JSON string in persistence layer)
     */
    pages?: Array<any> | string;
    /**
     * - Creation ISO timestamp
     */
    createdAt?: string;
    /**
     * - Last modified ISO timestamp
     */
    updatedAt?: string;
};
/**
 * @typedef {Object} StorageInitResult
 * @property {string} kind - Adapter identifier ('memory' | 'indexeddb' | 'opfs' | string)
 * @property {boolean} persistent - Whether storage persists across page reloads/sessions
 */
/**
 * @typedef {Object} DocRow
 * @property {string} [id] - Unique document identifier
 * @property {string} [name] - Document title
 * @property {Array<any>|string} [pages] - Document pages array (or serialized JSON string in persistence layer)
 * @property {string} [createdAt] - Creation ISO timestamp
 * @property {string} [updatedAt] - Last modified ISO timestamp
 */
/**
 * Base interface / contract for StoragePort implementations.
 */
export declare class StoragePort {
    /**
     * Initializes the storage backend, opening connections and verifying availability.
     * @returns {Promise<StorageInitResult>}
     */
    init(): Promise<StorageInitResult>;
    /**
     * Returns all stored documents.
     * @returns {Promise<DocRow[]>}
     */
    listDocs(): Promise<DocRow[]>;
    /**
     * Retrieves a document by its ID.
     * @param {string} _id
     * @returns {Promise<DocRow|null>}
     */
    getDoc(_id: string): Promise<DocRow | null>;
    /**
     * Saves or updates a document.
     * @param {string} _id
     * @param {DocRow} _doc
     * @returns {Promise<void>}
     */
    saveDoc(_id: string, _doc: DocRow): Promise<void>;
    /**
     * Deletes a document and its associated pages.
     * @param {string} _id
     * @returns {Promise<void>}
     */
    deleteDoc(_id: string): Promise<void>;
    /**
     * Saves page binary/data for a specific document.
     * @param {string} _docId
     * @param {string} _pageId
     * @param {any} _blobOrData
     * @returns {Promise<void>}
     */
    savePage(_docId: string, _pageId: string, _blobOrData: any): Promise<void>;
    /**
     * Retrieves page binary/data.
     * @param {string} _docId
     * @param {string} _pageId
     * @returns {Promise<any>}
     */
    getPage(_docId: string, _pageId: string): Promise<any>;
    /**
     * Deletes page binary/data.
     * @param {string} _docId
     * @param {string} _pageId
     * @returns {Promise<void>}
     */
    deletePage(_docId: string, _pageId: string): Promise<void>;
    /**
     * Subscribes to storage changes (document modifications, additions, deletions).
     * @param {() => void} _cb
     * @returns {() => void} Unsubscribe function
     */
    subscribe(_cb: () => void): () => void;
}
