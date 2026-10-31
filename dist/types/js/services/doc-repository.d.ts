export type DocMetadata = {
    /**
     * - Document ID
     */
    id: string;
    /**
     * - Document title
     */
    name: string;
    /**
     * - Number of pages in the document
     */
    pageCount: number;
    /**
     * - Document pages
     */
    pages?: Array<any>;
};
export type DocWithPages = {
    /**
     * - Document ID
     */
    id: string;
    /**
     * - Document title
     */
    name: string;
    /**
     * - Document pages array
     */
    pages: Array<any>;
};
/**
 * @typedef {Object} DocMetadata
 * @property {string} id - Document ID
 * @property {string} name - Document title
 * @property {number} pageCount - Number of pages in the document
 * @property {Array<any>} [pages] - Document pages
 */
/**
 * @typedef {Object} DocWithPages
 * @property {string} id - Document ID
 * @property {string} name - Document title
 * @property {Array<any>} pages - Document pages array
 */
/**
 * DocRepository — Headless Document Repository (Hexagonal Core / CPO-014).
 *
 * Encapsulates all document lifecycle and persistence logic behind a clean,
 * async API. Delegates storage to the configured StoragePort adapter and
 * eliminates direct store dependencies and JSON serialization from UI components.
 */
export declare class DocRepository {
    #private;
    /**
     * @param {import('../adapters/storage/storage-port.js').StoragePort} [adapter]
     */
    constructor(adapter?: import('../adapters/storage/storage-port.js').StoragePort);
    /**
     * Underlying StoragePort adapter.
     */
    get adapter(): any;
    /**
     * Backward-compatibility accessor for the underlying TinyBase store (if available).
     */
    get store(): any;
    /**
     * Initializes the repository and underlying storage adapter.
     * @returns {Promise<{ kind: string, persistent: boolean }>}
     */
    init(): Promise<{
        kind: string;
        persistent: boolean;
    }>;
    /**
     * Lists all documents with metadata synchronously if supported by adapter.
     * @returns {DocMetadata[]}
     */
    listDocsSync(): DocMetadata[];
    /**
     * Lists all documents with metadata (id, name, pageCount, pages).
     * @returns {Promise<DocMetadata[]>}
     */
    listDocs(): Promise<DocMetadata[]>;
    /**
     * Retrieves a document with its parsed pages array synchronously if supported.
     * @param {string} id
     * @returns {DocWithPages|null}
     */
    getDocSync(id: string): DocWithPages | null;
    /**
     * Retrieves a document with its parsed pages array.
     * Returns null if not found.
     * @param {string} id
     * @returns {Promise<DocWithPages|null>}
     */
    getDoc(id: string): Promise<DocWithPages | null>;
    /**
     * Creates a new document with an optional title and initial pages.
     * @param {string} [name='Untitled Document']
     * @param {Array<any>} [pages=[]]
     * @returns {Promise<DocWithPages>}
     */
    createDoc(name?: string, pages?: Array<any>): Promise<DocWithPages>;
    /**
     * Saves or updates an existing document.
     * @param {string} id
     * @param {{ name?: string, pages?: any[] }} doc
     * @returns {Promise<void>}
     */
    saveDoc(id: string, doc: {
        name?: string;
        pages?: any[];
    }): Promise<void>;
    /**
     * Renames a document.
     * @param {string} id
     * @param {string} name
     * @returns {Promise<void>}
     */
    renameDoc(id: string, name: string): Promise<void>;
    /**
     * Deletes a document with soft-delete undo support (CPO-016).
     * @param {string} id
     * @param {Object} [options]
     * @param {boolean} [options.soft=true] - Whether to allow undo for timeoutMs
     * @param {number} [options.timeoutMs=5000] - Duration in ms before purging permanently
     * @returns {Promise<{ id: string, name: string, undo: () => Promise<any> }|void>}
     */
    deleteDoc(id: string, { soft, timeoutMs }?: {
        soft?: boolean;
        timeoutMs?: number;
    }): Promise<{
        id: string;
        name: string;
        undo: () => Promise<any>;
    } | void>;
    /**
     * Restores a soft-deleted document back into the active store.
     * @param {string} id
     * @returns {Promise<DocWithPages|null>}
     */
    undoDeleteDoc(id: string): Promise<DocWithPages | null>;
    /**
     * Checks whether a document is currently in soft-delete state.
     * @param {string} id
     * @returns {boolean}
     */
    isSoftDeletedDoc(id: string): boolean;
    /**
     * Appends pages to an existing document.
     * @param {string} id
     * @param {Array<any>|any} pages
     * @returns {Promise<void>}
     */
    addPages(id: string, pages: Array<any> | any): Promise<void>;
    /**
     * Updates an individual page within a document.
     * @param {string} id
     * @param {string} pageId
     * @param {Record<string, any>} updates
     * @returns {Promise<void>}
     */
    updatePage(id: string, pageId: string, updates: Record<string, any>): Promise<void>;
    /**
     * Reorders pages in a document according to an array of page IDs.
     * Any pages omitted from pageIds will be appended at the end.
     * @param {string} id
     * @param {string[]} pageIds
     * @returns {Promise<void>}
     */
    reorderPages(id: string, pageIds: string[]): Promise<void>;
    /**
     * Deletes a page from a document with soft-delete undo support (CPO-016).
     * @param {string} id
     * @param {string} pageId
     * @param {Object} [options]
     * @param {boolean} [options.soft=true] - Whether to allow undo for timeoutMs
     * @param {number} [options.timeoutMs=5000] - Duration in ms before purging permanently
     * @returns {Promise<{ docId: string, pageId: string, undo: () => Promise<any> }|void>}
     */
    deletePage(id: string, pageId: string, { soft, timeoutMs }?: {
        soft?: boolean;
        timeoutMs?: number;
    }): Promise<{
        docId: string;
        pageId: string;
        undo: () => Promise<any>;
    } | void>;
    /**
     * Restores a soft-deleted page back into its parent document at its original index.
     * @param {string} id
     * @param {string} pageId
     * @returns {Promise<any|null>}
     */
    undoDeletePage(id: string, pageId: string): Promise<any | null>;
    /**
     * Checks whether a page is currently in soft-delete state.
     * @param {string} id
     * @param {string} pageId
     * @returns {boolean}
     */
    isSoftDeletedPage(id: string, pageId: string): boolean;
    /**
     * Subscribes to document updates in storage.
     * @param {() => void} cb
     * @returns {() => void} Unsubscribe function
     */
    subscribe(cb: () => void): () => void;
    /**
     * Returns all documents as a dictionary indexed by id.
     * @returns {Promise<Record<string, DocWithPages>>}
     */
    getAllDocs(): Promise<Record<string, DocWithPages>>;
    /**
     * Exports all documents formatted for wire transmission (e.g. P2P sync).
     * @returns {Promise<Record<string, { name: string, pages: string }>>}
     */
    exportAll(): Promise<Record<string, {
        name: string;
        pages: string;
    }>>;
    /**
     * Imports multiple documents from wire/raw format (e.g. from P2P sync).
     * @param {Record<string, any>} docsMap
     * @returns {Promise<number>} Count of newly added documents
     */
    importDocs(docsMap: Record<string, any>): Promise<number>;
}
/**
 * Singleton repository instance using default storage.
 */
export declare const docRepository: DocRepository;
