/**
 * License Manager (CPO-053 / CPO-061)
 * Client-side verification and key handling for Copio SDK tiers.
 */
export declare class LicenseManager {
    key: any;
    constructor(licenseKey?: any);
    setKey(key: any): void;
    getKey(): any;
    isValid(): boolean;
    getTier(): "commercial" | "community" | "enterprise" | "pro";
}
