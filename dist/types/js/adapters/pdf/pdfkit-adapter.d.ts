/**
 * PdfKitAdapter — Default Driven Adapter for PDF assembly via PDFKit (CPO-042, CPO-045).
 */
import { PdfPort } from './pdf-port.js';
export declare class PdfKitAdapter extends PdfPort {
    /**
     * @param {string} docName
     * @param {Array<any>} pages
     * @param {Object} [options]
     */
    exportDocumentAsPdf(docName: string, pages: Array<any>, options?: any): Promise<Blob>;
    /**
     * @param {File|Blob|ArrayBuffer} fileOrBuffer
     */
    renderPdfPagesToDataUrls(fileOrBuffer: File | Blob | ArrayBuffer): Promise<string[]>;
}
