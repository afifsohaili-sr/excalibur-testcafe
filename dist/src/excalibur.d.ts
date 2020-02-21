import { AxiosInstance } from "axios";
declare type ExcaliburConfig = {
    confluenceUrl?: string;
    confluenceUrlPrefix?: string;
    password?: string;
    username?: string;
};
declare class Excalibur {
    username: string;
    password: string;
    confluenceUrl: string;
    confluenceUrlPrefix: string;
    private httpService;
    constructor({ confluenceUrl, confluenceUrlPrefix, password, username, }: ExcaliburConfig);
    getHttpService(): AxiosInstance;
}
export { Excalibur };
//# sourceMappingURL=excalibur.d.ts.map