import { LitElement } from '../lib/lit-core.min.js';
export declare class CopioHeader extends LitElement {
    #private;
    _isPersisted: boolean;
    _storageEstimate: StorageEstimate;
    static styles: any;
    static properties: {
        _storageEstimate: {
            state: boolean;
        };
        _isPersisted: {
            state: boolean;
        };
    };
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    _formatBytes(bytes: any): string;
    render(): any;
}
