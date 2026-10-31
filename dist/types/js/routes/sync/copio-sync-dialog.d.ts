import { LitElement } from '../../lib/lit-core.min.js';
export declare class CopioSyncDialog extends LitElement {
    static properties: {
        syncState: {
            type: ObjectConstructor;
        };
    };
    createRenderRoot(): this;
    disconnectedCallback(): void;
    handleCloseClick: () => void;
    closeSyncDialog: () => void;
    render(): any;
}
