/**
 * TesseractWasmAdapter — Default Driven Adapter for OCR via Tesseract.js WASM (CPO-042, CPO-045).
 */
import { OcrPort } from './ocr-port.js';
export declare class TesseractWasmAdapter extends OcrPort {
    /**
     * @param {string|Blob|File|HTMLImageElement|HTMLCanvasElement} image
     * @param {Object} [options]
     */
    recognizeImageText(image: string | Blob | File | HTMLImageElement | HTMLCanvasElement, options?: any): Promise<{
        text: string;
        confidence: number;
        words: Array<any>;
        lines: Array<any>;
        paragraphs: Array<any>;
        hocr?: string;
    }>;
    /**
     * @param {Array<{ id: string, src?: string, type?: string, content?: string, name?: string }>} pages
     * @param {Object} [options]
     */
    recognizeDocumentPages(pages: Array<{
        id: string;
        src?: string;
        type?: string;
        content?: string;
        name?: string;
    }>, options?: any): Promise<{
        pagesResults: any[];
        combinedText: string;
        averageConfidence: number;
        empty?: boolean;
    }>;
    /**
     * @param {string} [lang='eng']
     * @param {Function} [onProgress]
     */
    getOcrWorker(lang?: string, onProgress?: Function): Promise<any>;
    terminateOcrWorker(): Promise<void>;
}
