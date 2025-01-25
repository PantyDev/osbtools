
import SbLoop from "../storyboarding/sbLoop";
import SbColorValue from "../storyboarding/values/sbColorValue";
import SbVectorValue from "../storyboarding/values/sbVectorValue";
import { ESbElementEasing, ESbElementOrigin, ESbElementProperty, ESbLayer } from "./enums";

type TSbLayerData<T> = {
    title: string;
    elements: T[]
}

type TSbLayersBuilder<T extends string, E> = {
    [key in T]: TSbLayerData<E>
}

type TUnstrictStoryboardElementData = {
    path: string,
    layer?: ESbLayer,
    origin?: ESbElementOrigin,
    defaultPosition?: SbVectorValue,
};

type TStoryboardElementData = {
    path: string,
    layer: ESbLayer,
    origin: ESbElementOrigin,
    defaultPosition: SbVectorValue,
};

type TStoryboardElementAnimationData = {
    frameCount: number,
    frameDelay: number,
    loopType?: string
}

type TStoryboardElementDefaultProps = {
    easing?: ESbElementEasing;
    startTime: number;
    endTime?: number;
}

type TStoryboardElementLoop = {
    startTime: number;
    loopCount: number;
    loopedProperties: () => TStoryboardElementPropertyItem<ESbElementProperty>[],
    properties?: TStoryboardElementPropertyItem<ESbElementProperty>[]; 
};

type TStoryboardElementMove = {
    startPosition: SbVectorValue;
    endPosition?: SbVectorValue;
} & TStoryboardElementDefaultProps;

type TStoryboardElementMoveX = {
    startPositionX: number;
    endPositionX?: number;
} & TStoryboardElementDefaultProps;

type TStoryboardElementMoveY = {
    startPositionY: number;
    endPositionY?: number;
} & TStoryboardElementDefaultProps;

type TStoryboardElementRotate = {
    startRotation: number;
    endRotation?: number;
} & TStoryboardElementDefaultProps;

type TStoryboardElementFade = {
    startFade: number;
    endFade?: number;
} & TStoryboardElementDefaultProps;

type TStoryboardElementScale = {
    startScale: number;
    endScale?: number;
} & TStoryboardElementDefaultProps;

type TStoryboardElementScaleVec = {
    startScaleVec: SbVectorValue;
    endScaleVec?: SbVectorValue;
} & TStoryboardElementDefaultProps;

type TStoryboardElementColor = {
    startColor: SbColorValue;
    endColor?: SbColorValue;
} & TStoryboardElementDefaultProps;

type TStoryboardElementParametersTypes = "H" | "V" | "A";

type TStoryboardElementParameters = {
    startParameter: TStoryboardElementParametersTypes
} & TStoryboardElementDefaultProps;

type TStoryboardElementPropertyMap = {
    [ESbElementProperty.M]: TStoryboardElementMove,
    [ESbElementProperty.MX]: TStoryboardElementMoveX,
    [ESbElementProperty.MY]: TStoryboardElementMoveY,
    [ESbElementProperty.R]: TStoryboardElementRotate,
    [ESbElementProperty.F]: TStoryboardElementFade,
    [ESbElementProperty.S]: TStoryboardElementScale,
    [ESbElementProperty.V]: TStoryboardElementScaleVec,
    [ESbElementProperty.C]: TStoryboardElementColor,
    [ESbElementProperty.P]: TStoryboardElementParameters,
    [ESbElementProperty.L]: TStoryboardElementLoop,
};

type TStoryboardElementPropertyItem<T extends ESbElementProperty> = {
    type: T,
    data: TStoryboardElementPropertyMap[T],
    toString: () => string;
};

export type { 
    TSbLayersBuilder, 
    TSbLayerData, 
    TUnstrictStoryboardElementData, 
    TStoryboardElementData,
    TStoryboardElementAnimationData,
    TStoryboardElementDefaultProps,
    TStoryboardElementMove,
    TStoryboardElementMoveX,
    TStoryboardElementMoveY,
    TStoryboardElementRotate,
    TStoryboardElementFade,
    TStoryboardElementScale,
    TStoryboardElementScaleVec,
    TStoryboardElementColor,
    TStoryboardElementParameters,
    TStoryboardElementParametersTypes,
    TStoryboardElementLoop,
    TStoryboardElementPropertyItem,
    TStoryboardElementPropertyMap
};