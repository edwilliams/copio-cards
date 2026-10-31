/**
 * Copio SDK Public Events Catalogue (CPO-036)
 *
 * Standardized CustomEvents dispatched by <copio-scanner> and Copio SDK components.
 * All public events are configured with bubbles: true and composed: true to cross
 * Shadow DOM boundaries into the host application.
 */
/**
 * Public event name constants.
 * @readonly
 * @enum {string}
 */
export declare const COPIO_EVENTS: {
    PAGE_ADDED: string;
    PAGE_REMOVED: string;
    PAGES_CHANGED: string;
    SCAN_COMPLETE: string;
    EXPORT_PROGRESS: string;
    EXPORT_COMPLETE: string;
    OCR_COMPLETE: string;
    SYNC_CONNECTED: string;
    ERROR: string;
};
/**
 * Dispatch a standard public Copio CustomEvent.
 * Configured with bubbles: true and composed: true so it crosses shadow boundaries.
 *
 * @param {EventTarget} target - Element or target dispatching the event
 * @param {string} eventName - One of COPIO_EVENTS or a custom copio:* event string
 * @param {Object} [detail={}] - Event payload data
 * @returns {CustomEvent} The dispatched event
 */
export declare function dispatchCopioEvent(target: EventTarget, eventName: string, detail?: any): CustomEvent;
export type CopioPageAddedDetail = {
    /**
     * - Page entity containing id, src, type, etc.
     */
    page: any;
    /**
     * - 1-based page index
     */
    pageNumber: number;
    /**
     * - Associated document ID
     */
    docId?: string;
    /**
     * - Source origin ('camera' | 'file' | 'import')
     */
    source?: string;
};
export type CopioPageRemovedDetail = {
    /**
     * - ID of removed page
     */
    pageId: string;
    /**
     * - Associated document ID
     */
    docId?: string;
};
export type CopioPagesChangedDetail = {
    /**
     * - Current list of pages
     */
    pages: Array<any>;
    /**
     * - Associated document ID
     */
    docId?: string;
};
export type CopioScanCompleteDetail = {
    /**
     * - ID of document scanned
     */
    docId: string;
    /**
     * - List of captured pages
     */
    pages: Array<any>;
    /**
     * - Number of pages in the scan
     */
    pageCount: number;
};
export type CopioExportProgressDetail = {
    /**
     * - Export format ('pdf' | 'zip' | 'image' | 'markdown')
     */
    type: string;
    /**
     * - Pages completed
     */
    done: number;
    /**
     * - Total pages
     */
    total: number;
    /**
     * - Progress percent (0-100)
     */
    percent: number;
    /**
     * - Document name
     */
    docName?: string;
};
export type CopioExportCompleteDetail = {
    /**
     * - Export format ('pdf' | 'zip' | 'image' | 'markdown')
     */
    type: string;
    /**
     * - Duplicate of type for convenience
     */
    format: string;
    /**
     * - The generated export binary Blob
     */
    blob: Blob;
    /**
     * - Document name
     */
    docName?: string;
    /**
     * - Associated document ID
     */
    docId?: string;
};
export type CopioOcrCompleteDetail = {
    /**
     * - Extracted combined text
     */
    text: string;
    /**
     * - Per-page OCR results with text and confidence
     */
    pages: Array<any>;
    /**
     * - Mean confidence score (0-100)
     */
    averageConfidence: number;
    /**
     * - Associated document ID
     */
    docId?: string;
    /**
     * - Specific page ID if single page OCR
     */
    pageId?: string;
};
export type CopioSyncConnectedDetail = {
    /**
     * - Connected peer ID
     */
    peerId: string;
    /**
     * - 'host' or 'client'
     */
    mode: string;
};
export type CopioErrorDetail = {
    /**
     * - Error classification code (e.g. 'FEATURE_DISABLED')
     */
    code: string;
    /**
     * - Human-readable error description
     */
    message: string;
    /**
     * - Underlying Error object if available
     */
    error?: Error;
};
/**
 * Type definitions for JSDoc documentation and autocompletion:
 *
 * @typedef {Object} CopioPageAddedDetail
 * @property {Object} page - Page entity containing id, src, type, etc.
 * @property {number} pageNumber - 1-based page index
 * @property {string} [docId] - Associated document ID
 * @property {string} [source] - Source origin ('camera' | 'file' | 'import')
 *
 * @typedef {Object} CopioPageRemovedDetail
 * @property {string} pageId - ID of removed page
 * @property {string} [docId] - Associated document ID
 *
 * @typedef {Object} CopioPagesChangedDetail
 * @property {Array<Object>} pages - Current list of pages
 * @property {string} [docId] - Associated document ID
 *
 * @typedef {Object} CopioScanCompleteDetail
 * @property {string} docId - ID of document scanned
 * @property {Array<Object>} pages - List of captured pages
 * @property {number} pageCount - Number of pages in the scan
 *
 * @typedef {Object} CopioExportProgressDetail
 * @property {string} type - Export format ('pdf' | 'zip' | 'image' | 'markdown')
 * @property {number} done - Pages completed
 * @property {number} total - Total pages
 * @property {number} percent - Progress percent (0-100)
 * @property {string} [docName] - Document name
 *
 * @typedef {Object} CopioExportCompleteDetail
 * @property {string} type - Export format ('pdf' | 'zip' | 'image' | 'markdown')
 * @property {string} format - Duplicate of type for convenience
 * @property {Blob} blob - The generated export binary Blob
 * @property {string} [docName] - Document name
 * @property {string} [docId] - Associated document ID
 *
 * @typedef {Object} CopioOcrCompleteDetail
 * @property {string} text - Extracted combined text
 * @property {Array<Object>} pages - Per-page OCR results with text and confidence
 * @property {number} averageConfidence - Mean confidence score (0-100)
 * @property {string} [docId] - Associated document ID
 * @property {string} [pageId] - Specific page ID if single page OCR
 *
 * @typedef {Object} CopioSyncConnectedDetail
 * @property {string} peerId - Connected peer ID
 * @property {string} mode - 'host' or 'client'
 *
 * @typedef {Object} CopioErrorDetail
 * @property {string} code - Error classification code (e.g. 'FEATURE_DISABLED')
 * @property {string} message - Human-readable error description
 * @property {Error} [error] - Underlying Error object if available
 */
