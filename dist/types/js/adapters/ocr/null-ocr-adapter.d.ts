/**
 * NullOcrAdapter — No-Op Driven Adapter for OCR (CPO-042).
 *
 * Used when OCR feature is disabled or opted out by developer.
 * Guarantees ZERO dynamic imports, ZERO Tesseract downloads, and ZERO WASM network requests.
 */
import { OcrPort } from './ocr-port.js';
export declare class NullOcrAdapter extends OcrPort {
    /**
     * Throws FEATURE_DISABLED error to prevent network requests.
     * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} _image
     * @param {Object} [_options]
     * @returns {Promise<any>}
     */
    recognizeImageText(_image: string | Blob | File | HTMLImageElement | HTMLCanvasElement, _options?: any): Promise<any>;
    /**
     * Throws FEATURE_DISABLED error to prevent network requests.
     * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} _pages
     * @param {Object} [_options]
     * @returns {Promise<any>}
     */
    recognizeDocumentPages(_pages: Array<{
        id: string;
        src?: string;
        type?: string;
        content?: string;
        name?: string;
    }>, _options?: any): Promise<any>;
    /**
     * Null worker without instantiating any WASM or worker thread.
     * @returns {Promise<null>}
     */
    getOcrWorker(): Promise<null>;
    /**
     * No-op termination.
     * @returns {Promise<void>}
     */
    terminateOcrWorker(): Promise<void>;
}
