import { TStoryboardElementAnimationData, TStoryboardElementData, TUnstrictStoryboardElementData } from "../types/types";
import SbSprite from "./sbSprite";
declare class SbAnimation extends SbSprite {
    #private;
    constructor({ path, layer, origin, defaultPosition, frameCount, frameDelay, loopType }: TUnstrictStoryboardElementData & TStoryboardElementAnimationData);
    getTitle(data: TStoryboardElementData): string;
}
export default SbAnimation;
//# sourceMappingURL=sbAnimation.d.ts.map