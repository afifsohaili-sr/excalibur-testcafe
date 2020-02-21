import { Excalibur } from "./excalibur";
declare class SpaceManager {
    private excalibur;
    constructor(excalibur: Excalibur);
    createSpace(key: string, name: string): Promise<any>;
}
export { SpaceManager };
//# sourceMappingURL=spaceManager.d.ts.map