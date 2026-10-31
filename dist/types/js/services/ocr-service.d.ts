/**
 * Copio Client-Side OCR (Optical Character Recognition) Service
 * Powered by Tesseract.js WASM & Web Workers
 * 100% Private, Local, Offline-First Document Text Extraction
 */
export declare const SUPPORTED_LANGUAGES: {
    code: string;
    label: string;
    flag: string;
}[];
/**
 * Get or initialize Tesseract worker
 */
export declare function getOcrWorker(lang?: string, onProgress?: any): Promise<any>;
/**
 * Recognize text from a single image (Data URL, Blob, File, or Image element)
 * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} image
 * @param {Object} options
 * @param {string} [options.lang='eng'] - Language code (e.g. 'eng', 'spa', 'fra')
 * @param {Function} [options.onProgress] - Progress callback ({ status, progress, message })
 * @param {AbortSignal} [options.abortSignal] - Signal to cancel recognition
 * @returns {Promise<{ text: string, confidence: number, words: Array<any>, lines: Array<any>, paragraphs: Array<any>, hocr?: string }>}
 */
export declare function recognizeImageText(image: string | Blob | File | HTMLImageElement | HTMLCanvasElement, options?: {
    lang?: string;
    onProgress?: Function;
    abortSignal?: AbortSignal;
}): Promise<{
    text: string;
    confidence: number;
    words: Array<any>;
    lines: Array<any>;
    paragraphs: Array<any>;
    hocr?: string;
}>;
/**
 * Batch recognize text from multiple pages
 * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} pages
 * @param {Object} options
 * @param {string} [options.lang='eng']
 * @param {Function} [options.onPageProgress] - ({ pageIndex, totalPages, pageProgress, overallProgress, message })
 * @param {AbortSignal} [options.abortSignal] - Signal to cancel recognition
 * @returns {Promise<{ pagesResults: Array, combinedText: string, averageConfidence: number, empty?: boolean }>}
 */
export declare function recognizeDocumentPages(pages: Array<{
    id: string;
    src?: string;
    type?: string;
    content?: string;
    name?: string;
}>, options?: {
    lang?: string;
    onPageProgress?: Function;
    abortSignal?: AbortSignal;
}): Promise<{
    pagesResults: any[];
    combinedText: string;
    averageConfidence: number;
    empty?: boolean;
}>;
/**
 * Terminate active worker to release memory
 */
export declare function terminateOcrWorker(): Promise<void>;
