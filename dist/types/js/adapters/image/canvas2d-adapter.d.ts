/**
 * Canvas2DAdapter (CPO-045 ImageProcessorPort implementation)
 *
 * Uses browser Canvas2D and image utilities (renderEditsToCanvas)
 * for non-destructive rendering of crop, rotate, and Sauvola B&W filters.
 */
import { ImageProcessorPort } from './image-processor-port.js';
export declare class Canvas2DAdapter extends ImageProcessorPort {
    /**
     * Applies non-destructive edits (crop, rotate, filter) to an original image source.
     * @param {string} originalSrc
     * @param {Object} edits
     * @returns {Promise<string>}
     */
    renderEdits(originalSrc: string, edits?: any): Promise<string>;
    /**
     * Crops an image source using normalized coordinates.
     * @param {string} src
     * @param {{ x: number, y: number, w: number, h: number }} crop
     * @returns {Promise<string>}
     */
    crop(src: string, crop: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): Promise<string>;
    /**
     * Rotates an image source.
     * @param {string} src
     * @param {number} degrees
     * @returns {Promise<string>}
     */
    rotate(src: string, degrees: number): Promise<string>;
    /**
     * Applies Sauvola adaptive B&W threshold to an image source.
     * @param {string} src
     * @param {'bw'|'none'} filter
     * @returns {Promise<string>}
     */
    applyFilter(src: string, filter: 'bw' | 'none'): Promise<string>;
}
