import { Excalibur } from "./excalibur";
declare class PluginManager {
    private excalibur;
    private upmToken;
    constructor(excalibur: Excalibur);
    private getUpmToken;
    install(obrPath: string): Promise<void>;
}
export { PluginManager };
//# sourceMappingURL=pluginManager.d.ts.map