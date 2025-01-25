import { TStoryboardElementColor, TStoryboardElementFade, TStoryboardElementLoop, TStoryboardElementMove, TStoryboardElementMoveX, TStoryboardElementMoveY, TStoryboardElementParameters, TStoryboardElementRotate, TStoryboardElementScale, TStoryboardElementScaleVec, TStoryboardElementTrigger } from "../types/types";
declare const convertPropertyToString: {
    move: (data: TStoryboardElementMove) => string;
    moveX: (data: TStoryboardElementMoveX) => string;
    moveY: (data: TStoryboardElementMoveY) => string;
    rotate: (data: TStoryboardElementRotate) => string;
    fade: (data: TStoryboardElementFade) => string;
    scale: (data: TStoryboardElementScale) => string;
    scaleVec: (data: TStoryboardElementScaleVec) => string;
    color: (data: TStoryboardElementColor) => string;
    parameters: (data: TStoryboardElementParameters) => string;
    loop: (data: TStoryboardElementLoop) => string;
    trigger: (data: TStoryboardElementTrigger) => string;
};
export { convertPropertyToString };
//# sourceMappingURL=converters.d.ts.map