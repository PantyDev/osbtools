import { TStoryboardElementData, TUnstrictStoryboardElementData } from "../types/types";
import StoryboardElement from "./storyboardElement";
declare class SbSprite extends StoryboardElement {
    constructor({ path, layer, origin, defaultPosition, }: TUnstrictStoryboardElementData);
    getTitle(data: TStoryboardElementData): string;
    toString(): string;
}
export default SbSprite;
//# sourceMappingURL=sbSprite.d.ts.map