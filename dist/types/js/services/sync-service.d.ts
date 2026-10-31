/**
 * Handles PeerJS peer-to-peer sync between host and joiner devices for TinyBase store.
 */
export declare class SyncManager {
    #private;
    constructor(storeOrRepo: any, onStateChange: any);
    get state(): any;
    startHost(): void;
    startJoiner(remotePeerId: any): void;
    close(): void;
}
