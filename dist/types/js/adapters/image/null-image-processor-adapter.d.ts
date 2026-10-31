/**
 * NullImageProcessorAdapter (CPO-045 ImageProcessorPort fallback)
 *
 * Safe no-op adapter for headless Node.js or environments without Canvas/DOM.
 * Returns the original image source directly.
 */
import { ImageProcessorPort } from './image-processor-port.js';
export declare class NullImageProcessorAdapter extends ImageProcessorPort {
    renderEdits(originalSrc: any, _edits: any): Promise<any>;
    crop(src: any, _crop: any): Promise<any>;
    rotate(src: any, _degrees: any): Promise<any>;
    applyFilter(src: any, _filter: any): Promise<any>;
}
