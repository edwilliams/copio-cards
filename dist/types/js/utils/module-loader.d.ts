/**
 * Copio Module & Asset Loader
 *
 * Provides lazy, asynchronous dynamic loading for third-party libraries:
 * - Cropper.js (window.Cropper)
 * - PDFKit (window.PDFDocument)
 * - JSZip (window.JSZip)
 * - Marked (window.marked)
 * - PeerJS (window.Peer)
 * - QRCode (window.qrcode)
 * - Tesseract.js (window.Tesseract)
 *
 * Eliminates classic global <script> tags from initial page load and provides
 * a configurable assetBase for worker, WASM, and language assets.
 */
/**
 * Get the currently configured asset base URL.
 * @returns {string}
 */
export declare function getAssetBase(): string;
/**
 * Configure the asset base URL for worker, WASM, and library scripts.
 * @param {string} base
 */
export declare function setAssetBase(base: string): void;
/**
 * Resolves a relative asset path against the configured assetBase.
 * Absolute URLs (http://, https://, data:, blob:) are returned unchanged.
 * @param {string} path
 * @returns {string}
 */
export declare function resolveAssetUrl(path: string): string;
/**
 * Dynamically loads an external script if not already present.
 * Caches the load Promise to ensure idempotent loading without duplicate injections.
 *
 * @param {string} relativeSrc Path relative to assetBase
 * @param {() => any} checkGlobal Function returning the global if already loaded
 * @returns {Promise<any>}
 */
export declare function loadScript(relativeSrc: string, checkGlobal: () => any): Promise<any>;
/**
 * Lazy loads Cropper.js on demand.
 * @returns {Promise<typeof Cropper>}
 */
export declare function loadCropper(): Promise<typeof Cropper>;
/**
 * Lazy loads PDFKit (PDFDocument) on demand.
 * @returns {Promise<any>}
 */
export declare function loadPdfKit(): Promise<any>;
/**
 * Lazy loads JSZip on demand.
 * @returns {Promise<any>}
 */
export declare function loadJsZip(): Promise<any>;
/**
 * Lazy loads marked markdown parser on demand.
 * @returns {Promise<any>}
 */
export declare function loadMarked(): Promise<any>;
/**
 * Lazy loads PeerJS on demand.
 * @returns {Promise<any>}
 */
export declare function loadPeerJs(): Promise<any>;
/**
 * Lazy loads qrcode generator on demand.
 * @returns {Promise<any>}
 */
export declare function loadQrCode(): Promise<any>;
/**
 * Lazy loads Tesseract.js on demand.
 * @returns {Promise<any>}
 */
export declare function loadTesseract(): Promise<any>;
