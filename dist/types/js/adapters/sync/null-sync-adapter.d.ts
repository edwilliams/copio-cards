/**
 * NullSyncAdapter (CPO-045 SyncPort fallback)
 *
 * Safe no-op adapter when synchronization is disabled or in headless environments.
 */
import { SyncPort } from './sync-port.js';
export declare class NullSyncAdapter extends SyncPort {
    connect(): Promise<{
        step: string;
        peerId: any;
        destroy: () => void;
    }>;
    disconnect(): Promise<void>;
}
