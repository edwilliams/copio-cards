/**
 * SyncPort (Hexagonal Architecture Driven Outbound Port CPO-045)
 *
 * Defines the contract for P2P / WebRTC synchronization.
 */
export declare class SyncPort {
    /**
     * Initializes or links a P2P sync session.
     * @param {Object} [_options]
     * @returns {Promise<any>}
     */
    connect(_options?: any): Promise<any>;
    /**
     * Disconnects or closes the sync session.
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
}
