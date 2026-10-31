/**
 * PdfPort — Outbound/Driven Port for PDF Export & Import (Hexagonal Architecture / CPO-042, CPO-045).
 *
 * Defines the contract that all PDF adapters (PDFKit, Null, Native/Browser) must implement.
 */
export declare class PdfPort {
    /**
     * Export document pages as a PDF Blob.
     * @param {string} _docName
     * @param {Array<any>} _pages
     * @param {Object} [_options]
     * @returns {Promise<Blob|undefined>}
     */
    exportDocumentAsPdf(_docName: string, _pages: Array<any>, _options?: any): Promise<Blob | undefined>;
    /**
     * Render pages of a PDF File or ArrayBuffer to image data URLs.
     * @param {File|Blob|ArrayBuffer} _fileOrBuffer
     * @returns {Promise<string[]>}
     */
    renderPdfPagesToDataUrls(_fileOrBuffer: File | Blob | ArrayBuffer): Promise<string[]>;
}
