/**
 * PeerJsAdapter (CPO-045 SyncPort implementation)
 *
 * Implements SyncPort using PeerJS WebRTC P2P sync.
 */
import { SyncPort } from './sync-port.js';
export declare class PeerJsAdapter extends SyncPort {
    #private;
    /**
     * @param {Object} [repo]
     * @param {Function} [onStateChange]
     */
    constructor(repo?: any, onStateChange?: Function);
    connect(options?: {}): Promise<any>;
    disconnect(): Promise<void>;
}
