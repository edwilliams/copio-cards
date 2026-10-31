/**
 * Copio Headless Core Domain & Storage (CPO-035, CPO-037, CPO-045, CPO-061)
 *
 * Hexagonal Core: Pure JS domain use cases, models, and driven ports.
 * Zero DOM, zero Lit, zero browser UI globals.
 *
 * Outbound driven ports (StoragePort, PdfPort, OcrPort, SyncPort) are decoupled
 * via pluggable service adapters, keeping core strictly under 80KB.
 */
import { DocRepository, docRepository } from '../js/services/doc-repository.js';
import { StoragePort, MemoryStorageAdapter, IndexedDbStorageAdapter, createDefaultAdapter } from '../js/adapters/storage/index.js';
import { randomId, fileToBase64, thresholdSrc, rotateSrc, getCroppedSrc, extractExif, applyEdits, normalizeEdits, renderEditsToCanvas, applySauvolaToImageData } from '../js/utils/utils.js';
import { BUILD_DATE, VERSION } from './version.js';
import { NullOcrAdapter } from '../js/adapters/ocr/null-ocr-adapter.js';
import { NullPdfAdapter } from '../js/adapters/pdf/null-pdf-adapter.js';
import { ImageProcessorPort, Canvas2DAdapter, NullImageProcessorAdapter } from '../js/adapters/image/index.js';
import { Document, Page, ScanSession, normalizeEditStack, hasActiveEdits } from './models.js';
export declare const DEFAULT_FEATURES: string[];
export declare const DEFAULT_EXPORT_FORMATS: string[];
export declare const DEFAULT_OCR_LANGUAGES: string[];
/**
 * Register a pluggable service adapter for headless ports (export, ocr, sync, pdf).
 * @param {string} name
 * @param {any} service
 */
export declare function registerService(name: string, service: any): void;
/**
 * Retrieve a registered service adapter.
 * @param {string} name
 * @returns {any}
 */
export declare function getRegisteredService(name: string): any;
/**
 * Headless Copio Engine driving port.
 */
export declare class CopioEngine {
    #private;
    /**
     * @param {Object} [options]
     * @param {StoragePort} [options.storage] - Persistence adapter implementing StoragePort
     * @param {DocRepository} [options.repository] - Headless document repository instance
     * @param {Object} [options.services] - Custom driven adapters ({ export, ocr, sync, pdf, imageProcessor })
     * @param {ImageProcessorPort} [options.imageProcessor] - Image transform adapter
     * @param {string|string[]} [options.features] - Enabled feature set ('crop rotate filter ocr export sync')
     * @param {string|string[]} [options.exportFormats] - Supported export formats ('pdf', 'zip', 'png', 'jpg')
     * @param {string|string[]} [options.ocrLanguages] - Configured OCR languages ('eng', 'deu', etc.)
     * @param {number} [options.maxPages=0] - Maximum allowed pages (0 = unlimited)
     * @param {string} [options.assetBase] - Base URL for lazy-loaded assets and workers
     * @param {string} [options.licenseKey] - SDK commercial license key
     * @param {boolean} [options.ocr=true] - Whether OCR module is enabled (developer opt-in CPO-042)
     * @param {boolean} [options.pdf=true] - Whether PDF module is enabled (developer opt-in CPO-042)
     */
    constructor(options?: {
        storage?: StoragePort;
        repository?: DocRepository;
        services?: any;
        imageProcessor?: ImageProcessorPort;
        features?: string | string[];
        exportFormats?: string | string[];
        ocrLanguages?: string | string[];
        maxPages?: number;
        assetBase?: string;
        licenseKey?: string;
        ocr?: boolean;
        pdf?: boolean;
    });
    /**
     * Initializes the underlying storage adapter.
     * @returns {Promise<{ kind: string, persistent: boolean }>}
     */
    init(): Promise<{
        kind: string;
        persistent: boolean;
    }>;
    /**
     * Register or override an adapter service for this engine instance.
     * @param {string} name
     * @param {any} service
     */
    setService(name: string, service: any): void;
    /**
     * Retrieve an adapter service instance.
     * @param {string} name
     * @returns {any}
     */
    getService(name: string): any;
    /**
     * Check if a specific feature is enabled.
     * @param {string} featureName
     * @returns {boolean}
     */
    hasFeature(featureName: string): boolean;
    /**
     * Returns list of currently enabled features.
     * @returns {string[]}
     */
    get features(): string[];
    /**
     * Set enabled features.
     * @param {string|string[]|Set<string>} features
     */
    setFeatures(features: string | string[] | Set<string>): void;
    /**
     * Enable a specific feature.
     * @param {string} featureName
     */
    enableFeature(featureName: string): void;
    /**
     * Disable a specific feature.
     * @param {string} featureName
     */
    disableFeature(featureName: string): void;
    /**
     * Developer opt-in status for OCR heavy module (CPO-042).
     * @type {boolean}
     */
    get ocr(): boolean;
    set ocr(enabled: boolean);
    /**
     * Developer opt-in status for PDF heavy module (CPO-042).
     * @type {boolean}
     */
    get pdf(): boolean;
    set pdf(enabled: boolean);
    /**
     * Get supported export formats.
     * @returns {string[]}
     */
    get exportFormats(): string[];
    /**
     * Set supported export formats.
     * @param {string|string[]} formats
     */
    set exportFormats(formats: string | string[]);
    /**
     * Get configured OCR languages.
     * @returns {string[]}
     */
    get ocrLanguages(): string[];
    /**
     * Set configured OCR languages.
     * @param {string|string[]} langs
     */
    set ocrLanguages(langs: string | string[]);
    /**
     * Maximum page limit (0 = unlimited).
     * @returns {number}
     */
    get maxPages(): number;
    /**
     * Set maximum page limit.
     * @param {number} limit
     */
    set maxPages(limit: number);
    /**
     * Get asset base path.
     * @returns {string}
     */
    get assetBase(): string;
    /**
     * Set asset base path for lazy worker/WASM loading.
     * @param {string} base
     */
    set assetBase(base: string);
    /**
     * License key.
     * @returns {string}
     */
    get licenseKey(): string;
    /**
     * Set license key.
     * @param {string} key
     */
    set licenseKey(key: string);
    /**
     * Underlying StoragePort adapter.
     * @returns {StoragePort}
     */
    get storage(): StoragePort;
    /**
     * Switch the underlying storage adapter.
     * @param {StoragePort} newStorage
     */
    setStorage(newStorage: StoragePort): void;
    /**
     * Current ImageProcessorPort adapter.
     * @type {ImageProcessorPort}
     */
    get imageProcessor(): ImageProcessorPort;
    setImageProcessor(processor: any): void;
    /**
     * Underlying document repository.
     * @returns {DocRepository}
     */
    get docs(): DocRepository;
    listDocuments(): Promise<any>;
    getDocument(id: any): Promise<any>;
    createDocument(name: any, pages: any): Promise<any>;
    deleteDocument(id: any, options?: {}): Promise<any>;
    undoDeleteDocument(id: any): Promise<any>;
    renameDocument(id: any, name: any): Promise<any>;
    addPages(id: any, pages: any): Promise<any>;
    deletePage(id: any, pageId: any, options?: {}): Promise<any>;
    undoDeletePage(id: any, pageId: any): Promise<any>;
    updatePage(id: any, pageId: any, updates: any): Promise<any>;
    reorderPages(id: any, pageIds: any): Promise<any>;
    /**
     * Applies non-destructive edits to a document page (CPO-011, CPO-045).
     * Generates derived src via ImageProcessorPort while keeping originalSrc intact.
     *
     * @param {string} docId
     * @param {string} pageId
     * @param {Object} edits
     * @returns {Promise<Object>}
     */
    applyEdit(docId: string, pageId: string, edits: any): Promise<any>;
    /**
     * Reverts the most recent operation on a document (CPO-016, CPO-045).
     * @param {string} docId
     * @returns {Promise<Object|null>}
     */
    undo(docId: string): Promise<any | null>;
    /**
     * Re-applies the most recently reverted operation on a document (CPO-045).
     * @param {string} docId
     * @returns {Promise<Object|null>}
     */
    redo(docId: string): Promise<any | null>;
    subscribe(callback: any): any;
    /**
     * Ingest and process an array of File or Blob objects, converting them to document pages.
     * Handles images (with EXIF extraction) and PDF files (rendering pages to data URLs).
     *
     * @param {FileList|File[]|Blob[]} files
     * @param {string} [docId] - Target document ID (if omitted, attaches to latest or creates new doc)
     * @returns {Promise<Array<Object>>} Added page entities
     */
    addFiles(files: FileList | File[] | Blob[], docId?: string): Promise<Array<any>>;
    /**
     * Get all pages for a document.
     * @param {string} [docId]
     * @returns {Promise<Array<Object>>}
     */
    getPages(docId?: string): Promise<Array<any>>;
    /**
     * Clear all pages from a document.
     * @param {string} [docId]
     * @returns {Promise<void>}
     */
    clear(docId?: string): Promise<void>;
    /**
     * Export document pages as a PDF Blob.
     * Does NOT trigger automatic browser download unless options.download === true.
     *
     * @param {string|Array<Object>} [docIdOrPages]
     * @param {Object} [options]
     * @param {boolean} [options.download=false] - Whether to trigger browser download
     * @param {Function} [options.onProgress] - Progress callback (done, total)
     * @returns {Promise<Blob>}
     */
    exportPdf(docIdOrPages?: string | Array<any>, options?: {
        download?: boolean;
        onProgress?: Function;
    }): Promise<Blob>;
    /**
     * Export document pages as a ZIP (or single image) Blob.
     * Does NOT trigger automatic browser download unless options.download === true.
     *
     * @param {string|Array<Object>} [docIdOrPages]
     * @param {Object} [options]
     * @param {boolean} [options.download=false] - Whether to trigger browser download
     * @param {Function} [options.onProgress] - Progress callback (done, total)
     * @returns {Promise<Blob>}
     */
    exportZip(docIdOrPages?: string | Array<any>, options?: {
        download?: boolean;
        onProgress?: Function;
    }): Promise<Blob>;
    /**
     * Run optical character recognition on document pages.
     *
     * @param {string|Array<Object>} [docIdOrPages]
     * @param {string} [pageId] - Optional specific page ID to recognize
     * @param {Object} [options]
     * @param {string} [options.lang] - OCR language (defaults to first configured language or 'eng')
     * @param {Function} [options.onPageProgress]
     * @returns {Promise<{ combinedText: string, text: string, pagesResults: Array<Object>, averageConfidence: number }>}
     */
    runOcr(docIdOrPages?: string | Array<any>, pageId?: string, options?: {
        lang?: string;
        onPageProgress?: Function;
    }): Promise<{
        combinedText: string;
        text: string;
        pagesResults: Array<any>;
        averageConfidence: number;
    }>;
    /**
     * Initialize P2P synchronization session.
     *
     * @param {Object} [options]
     * @param {Function} [options.onStateChange]
     * @returns {Promise<any>}
     */
    sync(options?: {
        onStateChange?: Function;
    }): Promise<any>;
}
export { DocRepository, docRepository, StoragePort, MemoryStorageAdapter, IndexedDbStorageAdapter, createDefaultAdapter, ImageProcessorPort, Canvas2DAdapter, NullImageProcessorAdapter, NullOcrAdapter, NullPdfAdapter, Document, Page, ScanSession, normalizeEditStack, hasActiveEdits, randomId, fileToBase64, thresholdSrc, rotateSrc, getCroppedSrc, extractExif, applyEdits, normalizeEdits, renderEditsToCanvas, applySauvolaToImageData, BUILD_DATE, VERSION, };
