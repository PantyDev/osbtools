import { TStoryboardElementData, TStoryboardElementSampleData } from "../types/types";
import SbSprite from "./sbSprite";
declare class SbSample extends SbSprite {
    #private;
    constructor({ path, startTime, layer, volume }: TStoryboardElementSampleData);
    getTitle(data: TStoryboardElementData): string;
}
export default SbSample;
//# sourceMappingURL=SbSample.d.ts.map