import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementColor, TStoryboardElementFade, TStoryboardElementLoop, TStoryboardElementMove, TStoryboardElementMoveX, TStoryboardElementMoveY, TStoryboardElementParameters, TStoryboardElementRotate, TStoryboardElementScale, TStoryboardElementScaleVec } from "../types/types";
import { isNumber } from "./checks";

const filterAndConvertProperty = (data: (string | number | null | undefined)[]) => 
    data
        .filter(x => x !== null)
        .join(",") 

const convertPropertyToString = {
    move: (data: TStoryboardElementMove) => 
        filterAndConvertProperty([ESbElementProperty.M, data.easing, data.startTime, data.endTime, data.startPosition.toString(), data.endPosition?.toString() || null]),
    moveX: (data: TStoryboardElementMoveX) => 
        filterAndConvertProperty([ESbElementProperty.MX, data.easing, data.startTime, data.endTime, isNumber(data.startPositionX), isNumber(data?.endPositionX)]),
    moveY: (data: TStoryboardElementMoveY) => 
        filterAndConvertProperty([ESbElementProperty.MY, data.easing, data.startTime, data.endTime, isNumber(data.startPositionY), isNumber(data?.endPositionY)]),
    rotate: (data: TStoryboardElementRotate) => 
        filterAndConvertProperty([ESbElementProperty.R, data.easing, data.startTime, data.endTime,  isNumber(data.startRotation), isNumber(data.endRotation)]),
    fade: (data: TStoryboardElementFade) => 
        filterAndConvertProperty([ESbElementProperty.F, data.easing, data.startTime, data.endTime, isNumber(data.startFade), isNumber(data?.endFade)]),
    scale: (data: TStoryboardElementScale) =>
        filterAndConvertProperty([ESbElementProperty.S, data.easing, data.startTime, data.endTime, isNumber(data.startScale), isNumber(data?.endScale)]),
    scaleVec: (data: TStoryboardElementScaleVec) => 
        filterAndConvertProperty([ESbElementProperty.V, data.easing, data.startTime, data.endTime, data.startScaleVec.toString(), data?.endScaleVec?.toString() || null]),
    color: (data: TStoryboardElementColor) => 
        filterAndConvertProperty([ESbElementProperty.C, data.easing, data.startTime, data.endTime, data.startColor.toString(), data.endColor?.toString() || null]),
    parameters: (data: TStoryboardElementParameters) =>
        filterAndConvertProperty([ESbElementProperty.P, data.easing, data.startTime, data.endTime, data.startParameter || null]),
    loop: (data: TStoryboardElementLoop) => 
        filterAndConvertProperty([ESbElementProperty.L, data.startTime, data.loopCount])
};

export { convertPropertyToString };