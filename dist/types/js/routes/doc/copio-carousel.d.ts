import { LitElement } from '../../lib/lit-core.min.js';
export declare class CopioCarousel extends LitElement {
    activeSlideIndex: number;
    docId: string;
    docName: string;
    images: any[];
    disconnectedCallback(): void;
    updated(changedProperties: any): void;
    static properties: {
        docId: {
            type: StringConstructor;
        };
        docName: {
            type: StringConstructor;
        };
        images: {
            type: ArrayConstructor;
        };
        activeSlideIndex: {
            type: NumberConstructor;
            state: boolean;
        };
    };
    get hasImages(): boolean;
    get hasMarkdown(): boolean;
    get pageCount(): number;
    static styles: any;
    constructor();
    handleBackClick(): void;
    handleOcrClick(): void;
    handleExportSelect(e: any): void;
    handleSlideChange(e: any): void;
    renderItem(img: any): any;
    render(): any;
}
