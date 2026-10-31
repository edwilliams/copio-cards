/**
 * Render raw markdown string into a PDFDocument instance (PDFKit).
 */
export declare function renderMarkdownToPdf(doc: any, rawContent: any): void;
/**
 * Render a markdown page object to image data URLs by rendering PDF and extracting pages as images.
 */
export declare function renderMarkdownToPageDataUrls(page: any): Promise<string[]>;
/**
 * Export document pages as a PDF file download.
 * @param {string} docName
 * @param {Array<any>} pages
 * @param {Object} [options]
 * @param {Function} [options.onProgress] - Callback invoked per page: (done, total) => void
 * @param {boolean} [options.showProgress=true] - Whether to show progress toast in UI
 * @param {boolean} [options.download=true] - Whether to trigger browser download
 * @returns {Promise<Blob|undefined>}
 */
export declare function exportDocumentAsPdf(docName: string, pages: Array<any>, options?: {
    onProgress?: Function;
    showProgress?: boolean;
    download?: boolean;
}): Promise<Blob | undefined>;
/**
 * Export document pages as individual images or a ZIP file.
 * @param {string} docName
 * @param {Array<any>} pages
 * @param {Object} [options]
 * @param {Function} [options.onProgress] - Callback invoked per page: (done, total) => void
 * @param {boolean} [options.showProgress=true] - Whether to show progress toast in UI
 * @param {boolean} [options.download=true] - Whether to trigger browser download
 * @returns {Promise<Blob|undefined>}
 */
export declare function exportDocumentAsImages(docName: string, pages: Array<any>, options?: {
    onProgress?: Function;
    showProgress?: boolean;
    download?: boolean;
}): Promise<Blob | undefined>;
/**
 * Export markdown pages of a document as a .md file download.
 */
export declare function exportDocumentAsMarkdown(docName: any, pages: any): void;
