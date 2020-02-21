import { AxiosInstance } from 'axios';

declare type ContentRepresentation = 'storage' | 'wiki';

export declare class Excalibur {
    username: string;
    password: string;
    confluenceUrl: string;
    confluenceUrlPrefix: string;
    private httpService;
    constructor({ confluenceUrl, confluenceUrlPrefix, password, username, }: ExcaliburConfig);
    getHttpService(): AxiosInstance;
    waitForConfluenceBoot(timeout?: number): Promise<void>;
}

declare type ExcaliburConfig = {
    confluenceUrl?: string;
    confluenceUrlPrefix?: string;
    password?: string;
    username?: string;
};

export declare class PageManager {
    private excalibur;
    constructor(excalibur: Excalibur);
    createPage(title: string, body: string, contentRepresentation: ContentRepresentation, spaceKey: string): Promise<any>;
}

export declare class PluginManager {
    private excalibur;
    private upmToken;
    constructor(excalibur: Excalibur);
    private getUpmToken;
    install(obrPath: string): Promise<void>;
}

export declare class SpaceManager {
    private excalibur;
    constructor(excalibur: Excalibur);
    createSpace(key: string, name: string): Promise<any>;
}

export { }
