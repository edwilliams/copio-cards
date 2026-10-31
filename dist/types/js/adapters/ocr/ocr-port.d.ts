/**
 * OcrPort — Outbound/Driven Port for Optical Character Recognition (Hexagonal Architecture / CPO-042, CPO-045).
 *
 * Defines the contract that all OCR adapters (Tesseract WASM, Null, Cloud) must implement.
 */
export type OcrProgress = {
    /**
     * - Progress status identifier
     */
    status: string;
    /**
     * - Progress value (0 to 1)
     */
    progress: number;
    /**
     * - Human-readable status message
     */
    message: string;
    /**
     * - Raw worker message
     */
    raw?: any;
};
export type OcrPageResult = {
    /**
     * - Page identifier
     */
    id: string;
    /**
     * - Extracted text content
     */
    text: string;
    /**
     * - OCR confidence score (0 to 100)
     */
    confidence: number;
    /**
     * - Extracted words
     */
    words?: Array<any>;
    /**
     * - Extracted lines
     */
    lines?: Array<any>;
    /**
     * - Extracted paragraphs
     */
    paragraphs?: Array<any>;
    /**
     * - hOCR markup
     */
    hocr?: string;
};
export type OcrBatchResult = {
    /**
     * - Per-page extraction results
     */
    pagesResults: OcrPageResult[];
    /**
     * - Aggregated document text
     */
    combinedText: string;
    /**
     * - Average confidence percentage
     */
    averageConfidence: number;
    /**
     * - True if no images were processed
     */
    empty?: boolean;
};
/**
 * @typedef {Object} OcrProgress
 * @property {string} status - Progress status identifier
 * @property {number} progress - Progress value (0 to 1)
 * @property {string} message - Human-readable status message
 * @property {any} [raw] - Raw worker message
 */
/**
 * @typedef {Object} OcrPageResult
 * @property {string} id - Page identifier
 * @property {string} text - Extracted text content
 * @property {number} confidence - OCR confidence score (0 to 100)
 * @property {Array<any>} [words] - Extracted words
 * @property {Array<any>} [lines] - Extracted lines
 * @property {Array<any>} [paragraphs] - Extracted paragraphs
 * @property {string} [hocr] - hOCR markup
 */
/**
 * @typedef {Object} OcrBatchResult
 * @property {OcrPageResult[]} pagesResults - Per-page extraction results
 * @property {string} combinedText - Aggregated document text
 * @property {number} averageConfidence - Average confidence percentage
 * @property {boolean} [empty] - True if no images were processed
 */
/**
 * Base contract for OCR Port implementations.
 */
export declare class OcrPort {
    /**
     * Recognize text from a single image.
     * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} _image
     * @param {Object} [_options]
     * @returns {Promise<{ text: string, confidence: number, words?: any[], lines?: any[], paragraphs?: any[], hocr?: string }>}
     */
    recognizeImageText(_image: string | Blob | File | HTMLImageElement | HTMLCanvasElement, _options?: any): Promise<{
        text: string;
        confidence: number;
        words?: any[];
        lines?: any[];
        paragraphs?: any[];
        hocr?: string;
    }>;
    /**
     * Batch recognize text across multiple document pages.
     * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} _pages
     * @param {Object} [_options]
     * @returns {Promise<OcrBatchResult>}
     */
    recognizeDocumentPages(_pages: Array<{
        id: string;
        src?: string;
        type?: string;
        content?: string;
        name?: string;
    }>, _options?: any): Promise<OcrBatchResult>;
    /**
     * Obtain or initialize an active OCR worker instance.
     * @param {string} [_lang='eng']
     * @param {Function} [_onProgress]
     * @returns {Promise<any>}
     */
    getOcrWorker(_lang?: string, _onProgress?: Function): Promise<any>;
    /**
     * Terminate active OCR worker and release resources.
     * @returns {Promise<void>}
     */
    terminateOcrWorker(): Promise<void>;
}
