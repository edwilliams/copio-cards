import { LitElement } from '../../lib/lit-core.min.js';
export declare class CopioAddEditDialog extends LitElement {
    #private;
    createRenderRoot(): this;
    disconnectedCallback(): void;
    open(): Promise<void>;
    openEdit(id: any, name: any, pages: any): Promise<void>;
    render(): any;
}
