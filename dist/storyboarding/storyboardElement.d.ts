import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementColor, TStoryboardElementData, TStoryboardElementDefaultProps, TStoryboardElementFade, TStoryboardElementLoop, TStoryboardElementMove, TStoryboardElementMoveX, TStoryboardElementMoveY, TStoryboardElementPropertyItem, TStoryboardElementRotate, TStoryboardElementScale, TStoryboardElementScaleVec, TStoryboardElementTrigger, TUnstrictStoryboardElementData } from "../types/types";
declare abstract class StoryboardElement {
    #private;
    constructor({ path, layer, origin, defaultPosition, }: TUnstrictStoryboardElementData);
    getData(): TStoryboardElementData;
    getProperties(): TStoryboardElementPropertyItem<ESbElementProperty>[];
    loop(data: TStoryboardElementLoop): this;
    trigger(data: TStoryboardElementTrigger): this;
    move(data: TStoryboardElementMove): StoryboardElement;
    moveX(data: TStoryboardElementMoveX): StoryboardElement;
    moveY(data: TStoryboardElementMoveY): StoryboardElement;
    rotate(data: TStoryboardElementRotate): StoryboardElement;
    fade(data: TStoryboardElementFade): StoryboardElement;
    scale(data: TStoryboardElementScale): StoryboardElement;
    scaleVec(data: TStoryboardElementScaleVec): StoryboardElement;
    color(data: TStoryboardElementColor): StoryboardElement;
    flipH(data: TStoryboardElementDefaultProps): StoryboardElement;
    flipV(data: TStoryboardElementDefaultProps): StoryboardElement;
    additive(data: TStoryboardElementDefaultProps): StoryboardElement;
    abstract toString(): string;
}
export default StoryboardElement;
//# sourceMappingURL=storyboardElement.d.ts.map