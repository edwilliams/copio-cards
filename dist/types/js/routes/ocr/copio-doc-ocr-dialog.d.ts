import { LitElement } from '../../lib/lit-core.min.js';
export declare class CopioDocOcrDialog extends LitElement {
    #private;
    isOpen: boolean;
    docId: string;
    docName: string;
    pages: any[];
    step: string;
    progress: number;
    statusMessage: string;
    resultText: string;
    confidence: number;
    copied: boolean;
    _pageIndex: number;
    static properties: {
        isOpen: {
            type: BooleanConstructor;
            state: boolean;
        };
        docId: {
            type: StringConstructor;
            state: boolean;
        };
        docName: {
            type: StringConstructor;
            state: boolean;
        };
        pages: {
            type: ArrayConstructor;
            state: boolean;
        };
        lang: {
            type: StringConstructor;
            state: boolean;
        };
        step: {
            type: StringConstructor;
            state: boolean;
        };
        progress: {
            type: NumberConstructor;
            state: boolean;
        };
        statusMessage: {
            type: StringConstructor;
            state: boolean;
        };
        resultText: {
            type: StringConstructor;
            state: boolean;
        };
        confidence: {
            type: NumberConstructor;
            state: boolean;
        };
        copied: {
            type: BooleanConstructor;
            state: boolean;
        };
    };
    createRenderRoot(): this;
    disconnectedCallback(): void;
    constructor();
    /**
     * Open for a full document (all image pages).
     * @param {string} docId
     * @param {string} docName
     * @param {Array} pages
     * @param {string} [lang]
     */
    open(docId: string, docName: string, pages: any[], lang?: string): void;
    /**
     * Open for a single page (from the page grid or carousel).
     * @param {string} docId
     * @param {string} docName
     * @param {{ id: string, src: string }} page   – the single image page object
     * @param {number} pageIndex                   – its index in the document pages array
     * @param {string} [lang]
     */
    openPage(docId: string, docName: string, page: {
        id: string;
        src: string;
    }, pageIndex: number, lang?: string): void;
    _openInternal(docId: any, docName: any, pages: any, lang: any): void;
    cancel: () => void;
    close: () => void;
    startOcr(lang?: string): Promise<void>;
    handleLangChange: (e: any) => void;
    handleTextInput: (e: any) => void;
    copyText: () => Promise<void>;
    downloadMarkdown: () => void;
    downloadText: () => void;
    saveAsNote: () => void;
    get _isSinglePage(): boolean;
    get _dialogLabel(): string;
    render(): any;
}
