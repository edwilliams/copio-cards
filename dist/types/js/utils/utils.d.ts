export declare function extractExif(file: any): Promise<any>;
export declare function randomId(): string;
export declare function fileToBase64(file: any): Promise<any>;
/**
 * Local adaptive document binarization using the Sauvola algorithm (from Doxa framework)
 * Optimized using 2D Integral Images for O(W * H) linear time execution.
 *
 * @param {ImageData} imageData
 * @param {number} [windowSize=21]
 * @param {number} [k=0.2]
 * @param {number} [R=128]
 * @returns {ImageData}
 */
export declare function applySauvolaToImageData(imageData: ImageData, windowSize?: number, k?: number, R?: number): ImageData;
export declare function thresholdSrc(src: any, windowSize?: number, k?: number, R?: number): Promise<any>;
export declare function rotateSrc(src: any): Promise<any>;
export declare function getCroppedSrc(cropper: any, originalSrc?: string): any;
/**
 * Normalizes an edit stack object.
 * @param {Object} [edits]
 * @returns {{ crop: { x: number, y: number, width: number, height: number } | null, rotation: number, filter: string }}
 */
export declare function normalizeEdits(edits?: any): {
    crop: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    rotation: number;
    filter: string;
};
/**
 * Checks whether an edit stack contains any active transformations.
 * @param {Object} [edits]
 * @returns {boolean}
 */
export declare function hasActiveEdits(edits?: any): boolean;
/**
 * Renders an image or canvas through the edit stack synchronously onto a new canvas.
 * @param {HTMLImageElement|HTMLCanvasElement} imgOrCanvas
 * @param {Object} [edits]
 * @returns {HTMLCanvasElement}
 */
export declare function renderEditsToCanvas(imgOrCanvas: HTMLImageElement | HTMLCanvasElement, edits?: any): HTMLCanvasElement;
/**
 * Applies non-destructive edits to an original image src.
 * Resolves to the derived data URL.
 *
 * @param {string} originalSrc
 * @param {Object} [edits]
 * @returns {Promise<string>}
 */
export declare function applyEdits(originalSrc: string, edits?: any): Promise<string>;
