/**
 * NullPdfAdapter — No-Op Driven Adapter for PDF (CPO-042).
 *
 * Used when PDF export/import is disabled or opted out by developer.
 * Guarantees ZERO dynamic imports, ZERO PDFKit downloads, and ZERO network requests.
 */
import { PdfPort } from './pdf-port.js';
export declare class NullPdfAdapter extends PdfPort {
    /**
     * Throws FEATURE_DISABLED error to prevent network requests.
     * @param {string} _docName
     * @param {Array<any>} _pages
     * @param {Object} [_options]
     * @returns {Promise<any>}
     */
    exportDocumentAsPdf(_docName: string, _pages: Array<any>, _options?: any): Promise<any>;
    /**
     * Returns empty array without importing pdf-utils or making network calls.
     * @param {File|Blob|ArrayBuffer} _fileOrBuffer
     * @returns {Promise<string[]>}
     */
    renderPdfPagesToDataUrls(_fileOrBuffer: File | Blob | ArrayBuffer): Promise<string[]>;
}
