/**
 * Core Domain Models & Entities (CPO-045 Hexagonal Architecture)
 *
 * Pure JavaScript domain models with zero DOM and zero Lit dependencies.
 */
/**
 * Normalizes an edit stack object with safe defaults.
 * @param {Object} [edits]
 * @returns {{ crop: { x: number, y: number, w: number, h: number } | null, rotate: 0|90|180|270, filter: 'none'|'bw' }}
 */
export declare function normalizeEditStack(edits?: any): {
    crop: {
        x: number;
        y: number;
        w: number;
        h: number;
    } | null;
    rotate: 0 | 90 | 180 | 270;
    filter: 'none' | 'bw';
};
/**
 * Checks whether an edit stack contains any non-default modifications.
 * @param {Object} [edits]
 * @returns {boolean}
 */
export declare function hasActiveEdits(edits?: any): boolean;
/**
 * Page domain entity.
 */
export declare class Page {
    id: string;
    src: string;
    originalSrc: string;
    edits: {
        crop: {
            x: number;
            y: number;
            w: number;
            h: number;
        } | null;
        rotate: 0 | 90 | 180 | 270;
        filter: 'none' | 'bw';
    };
    name: string;
    type: string;
    orientation: number;
    ocrText: string;
    ocrConfidence: number;
    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.src - Derived render
     * @param {string} [data.originalSrc] - Raw immutable original
     * @param {Object} [data.edits] - Non-destructive edit stack
     * @param {string} [data.name]
     * @param {string} [data.type]
     * @param {number} [data.orientation]
     * @param {string|null} [data.ocrText]
     * @param {number|null} [data.ocrConfidence]
     */
    constructor(data: {
        id: string;
        src: string;
        originalSrc?: string;
        edits?: any;
        name?: string;
        type?: string;
        orientation?: number;
        ocrText?: string | null;
        ocrConfidence?: number | null;
    });
    get isModified(): boolean;
    toJSON(): {
        id: string;
        src: string;
        originalSrc: string;
        edits: {
            crop: {
                x: number;
                y: number;
                w: number;
                h: number;
            } | null;
            rotate: 0 | 90 | 180 | 270;
            filter: 'none' | 'bw';
        };
        name: string;
        type: string;
        orientation: number;
        ocrText: string;
        ocrConfidence: number;
    };
}
/**
 * Document domain entity.
 */
export declare class Document {
    id: string;
    name: string;
    pages: Page[];
    createdAt: number;
    updatedAt: number;
    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.name
     * @param {Array<Page|Object>} [data.pages]
     * @param {number} [data.createdAt]
     * @param {number} [data.updatedAt]
     */
    constructor(data: {
        id: string;
        name: string;
        pages?: Array<Page | any>;
        createdAt?: number;
        updatedAt?: number;
    });
    get pageCount(): number;
    toJSON(): {
        id: string;
        name: string;
        pages: {
            id: string;
            src: string;
            originalSrc: string;
            edits: {
                crop: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                } | null;
                rotate: 0 | 90 | 180 | 270;
                filter: 'none' | 'bw';
            };
            name: string;
            type: string;
            orientation: number;
            ocrText: string;
            ocrConfidence: number;
        }[];
        createdAt: number;
        updatedAt: number;
    };
}
/**
 * ScanSession domain model for ongoing capture workflows (CPO-034).
 */
export declare class ScanSession {
    mode: string;
    aspect: "a4" | "auto" | "card" | "receipt";
    docId: string;
    maxPages: number;
    stage: string;
    activePageIndex: number;
    history: any[];
    future: any[];
    /**
     * @param {Object} [options]
     * @param {'single'|'batch'} [options.mode='batch']
     * @param {'receipt'|'card'|'a4'|'auto'} [options.aspect='auto']
     * @param {string} [options.docId]
     * @param {number} [options.maxPages=0]
     */
    constructor(options?: {
        mode?: 'single' | 'batch';
        aspect?: 'receipt' | 'card' | 'a4' | 'auto';
        docId?: string;
        maxPages?: number;
    });
    pushHistory(entry: any): void;
    undo(): any;
    redo(): any;
}
