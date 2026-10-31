/**
 * ImageProcessorPort (Hexagonal Architecture Driven Outbound Port CPO-045)
 *
 * Defines the contract for offloading canvas transforms, crop extraction,
 * rotation, and Sauvola adaptive threshold filter rendering.
 */
export declare class ImageProcessorPort {
    /**
     * Applies non-destructive edits (crop, rotate, filter) to an original image source.
     * @param {string} _originalSrc - Data URL or Object URL of the raw original image
     * @param {Object} _edits - Edit stack { crop, rotate, filter }
     * @returns {Promise<string>} Derived image data URL with edits applied
     */
    renderEdits(_originalSrc: string, _edits: any): Promise<string>;
    /**
     * Crops an image source.
     * @param {string} _src
     * @param {{ x: number, y: number, w: number, h: number }} _crop - Normalized coordinates
     * @returns {Promise<string>}
     */
    crop(_src: string, _crop: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): Promise<string>;
    /**
     * Rotates an image source by degrees.
     * @param {string} _src
     * @param {number} _degrees - 90, 180, 270
     * @returns {Promise<string>}
     */
    rotate(_src: string, _degrees: number): Promise<string>;
    /**
     * Applies an adaptive or tonal filter to an image source.
     * @param {string} _src
     * @param {'bw'|'none'} _filter
     * @returns {Promise<string>}
     */
    applyFilter(_src: string, _filter: 'bw' | 'none'): Promise<string>;
}
