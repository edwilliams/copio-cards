export declare class CopioImages extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    setCameraStream(stream: any): void;
    stopCamera(): void;
    openCropDialog(index: any): Promise<void>;
    closeCropDialog(): void;
    applyCrop(): void;
    rotateImage(index: any): Promise<void>;
    thresholdImage(index: any): Promise<void>;
    resetImage(index: any): void;
    addBlankNote(): void;
    downloadImage(index: any): void;
    openTextDialog(index: any): void;
    applyTextEdit(): void;
    closeTextDialog(): void;
    showImageData(index: any): void;
    pdfToImages(file: any): Promise<{
        id: string;
        src: string;
        originalSrc: string;
        edits: {
            crop: any;
            rotation: number;
            filter: string;
        };
    }[]>;
    addFiles(files: any): Promise<void>;
    get images(): any[];
    set images(val: any[]);
}
