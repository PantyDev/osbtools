import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementColor, TStoryboardElementFade, TStoryboardElementLoop, TStoryboardElementMove, TStoryboardElementMoveX, TStoryboardElementMoveY, TStoryboardElementParameters, TStoryboardElementRotate, TStoryboardElementScale, TStoryboardElementScaleVec, TStoryboardElementTrigger } from "../types/types";
import { getNumberOrNull } from "./checks";

const filterAndConvertProperty = (data: (string | number | null | undefined)[]) => 
    data
        .filter(x => x !== null)
        .join(",") 

const convertPropertyToString = {
    move: (data: TStoryboardElementMove) => 
        filterAndConvertProperty([ESbElementProperty.M, data.easing, data.startTime, data.endTime, data.startPosition.toString(), data.endPosition?.toString() || null]),
    moveX: (data: TStoryboardElementMoveX) => 
        filterAndConvertProperty([ESbElementProperty.MX, data.easing, data.startTime, data.endTime, getNumberOrNull(data.startPositionX), getNumberOrNull(data?.endPositionX)]),
    moveY: (data: TStoryboardElementMoveY) => 
        filterAndConvertProperty([ESbElementProperty.MY, data.easing, data.startTime, data.endTime, getNumberOrNull(data.startPositionY), getNumberOrNull(data?.endPositionY)]),
    rotate: (data: TStoryboardElementRotate) => 
        filterAndConvertProperty([ESbElementProperty.R, data.easing, data.startTime, data.endTime,  getNumberOrNull(data.startRotation), getNumberOrNull(data.endRotation)]),
    fade: (data: TStoryboardElementFade) => 
        filterAndConvertProperty([ESbElementProperty.F, data.easing, data.startTime, data.endTime, getNumberOrNull(data.startFade), getNumberOrNull(data?.endFade)]),
    scale: (data: TStoryboardElementScale) =>
        filterAndConvertProperty([ESbElementProperty.S, data.easing, data.startTime, data.endTime, getNumberOrNull(data.startScale), getNumberOrNull(data?.endScale)]),
    scaleVec: (data: TStoryboardElementScaleVec) => 
        filterAndConvertProperty([ESbElementProperty.V, data.easing, data.startTime, data.endTime, data.startScaleVec.toString(), data?.endScaleVec?.toString() || null]),
    color: (data: TStoryboardElementColor) => 
        filterAndConvertProperty([ESbElementProperty.C, data.easing, data.startTime, data.endTime, data.startColor.toString(), data.endColor?.toString() || null]),
    parameters: (data: TStoryboardElementParameters) =>
        filterAndConvertProperty([ESbElementProperty.P, data.easing, data.startTime, data.endTime, data.startParameter || null]),
    loop: (data: TStoryboardElementLoop) => 
        filterAndConvertProperty([ESbElementProperty.L, data.startTime, data.loopCount]),
    trigger: (data: TStoryboardElementTrigger) => 
        filterAndConvertProperty([ESbElementProperty.T, data.triggerName, data.startTime, data.endTime])
};

export { convertPropertyToString };