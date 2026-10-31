/**
 * Renders all pages of a PDF (given as ArrayBuffer) into base64 JPEG image data URLs.
 * @param {ArrayBuffer} arrayBuffer
 * @param {number} scale
 * @returns {Promise<string[]>} Array of image data URLs
 */
export declare function renderPdfPagesToDataUrls(arrayBuffer: ArrayBuffer, scale?: number): Promise<string[]>;
