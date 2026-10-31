/**
 * Unified toast & notification service (CPO-022)
 * Wraps Shoelace sl-alert.toast() with success, error, warning, info, and undo variants.
 * Supports container scoping for SDK mode and constrained layouts.
 */
/**
 * Configure target container where toast stacks should render.
 * @param {HTMLElement|null} container - null resets to document.body
 */
export declare function setContainer(container: HTMLElement | null): void;
/**
 * Get the currently configured toast container.
 * @returns {HTMLElement}
 */
export declare function getContainer(): HTMLElement;
/**
 * Dismiss all currently active toasts.
 */
export declare function clear(): void;
/**
 * Display a unified toast notification.
 * @param {string|Object} messageOrOptions
 * @param {Object} [options]
 * @returns {Promise<HTMLElement>} The created <sl-alert> element
 */
export declare function show(messageOrOptions: string | any, options?: any): Promise<HTMLElement>;
/**
 * Display a success notification.
 */
export declare function success(message: any, options?: {}): Promise<HTMLElement>;
/**
 * Display an error notification.
 */
export declare function error(message: any, options?: {}): Promise<HTMLElement>;
/**
 * Display a warning notification.
 */
export declare function warning(message: any, options?: {}): Promise<HTMLElement>;
/**
 * Display an informational notification.
 */
export declare function info(message: any, options?: {}): Promise<HTMLElement>;
/**
 * Display an undoable notification.
 * @param {string} message
 * @param {Function} onUndo - Callback invoked when the user clicks Undo
 * @param {Object} [options]
 */
export declare function undo(message: string, onUndo: Function, options?: any): Promise<HTMLElement>;
/**
 * Display a progress toast notification with a determinate or indeterminate progress bar.
 * @param {string|Object} messageOrOptions
 * @param {Object} [options]
 * @returns {Promise<{ alert: HTMLElement, progressBar: HTMLElement, update: (opts: { done?: number, total?: number, value?: number, message?: string }) => void, close: () => void }>}
 */
export declare function progress(messageOrOptions: string | any, options?: any): Promise<{
    alert: HTMLElement;
    progressBar: HTMLElement;
    update: (opts: {
        done?: number;
        total?: number;
        value?: number;
        message?: string;
    }) => void;
    close: () => void;
}>;
/**
 * Main notify interface.
 */
export declare const notify: ((messageOrOptions: any, options: any) => Promise<HTMLElement>) & {
    show: typeof show;
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    info: typeof info;
    undo: typeof undo;
    progress: typeof progress;
    clear: typeof clear;
    setContainer: typeof setContainer;
    getContainer: typeof getContainer;
};
export default notify;
