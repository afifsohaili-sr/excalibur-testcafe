import { Excalibur } from "./excalibur";
declare type ContentRepresentation = 'storage' | 'wiki';
declare class PageManager {
    private excalibur;
    constructor(excalibur: Excalibur);
    createPage(title: string, body: string, contentRepresentation: ContentRepresentation, spaceKey: string): Promise<any>;
}
export { PageManager };
//# sourceMappingURL=pageManager.d.ts.map