import { LitElement } from '../../lib/lit-core.min.js';
export declare class CopioRow extends LitElement {
    #private;
    name: string;
    pages: any[];
    isRenaming: boolean;
    renameValue: string;
    static properties: {
        name: {
            type: StringConstructor;
        };
        pages: {
            type: ArrayConstructor;
        };
        isRenaming: {
            type: BooleanConstructor;
            state: boolean;
        };
        renameValue: {
            type: StringConstructor;
            state: boolean;
        };
    };
    constructor();
    get hasImages(): boolean;
    get hasMarkdown(): boolean;
    get pageCount(): number;
    static styles: any;
    startRename(e: any): void;
    cancelRename(e: any): void;
    commitRename(e: any): void;
    handleRenameKeyDown(e: any): void;
    handleExtractOcr(): void;
    handleView(): void;
    handleDelete(): void;
    handleEdit(): void;
    handleDownload(): void;
    handleDownloadImages(): void;
    handleDownloadMarkdown(): void;
    render(): any;
}
