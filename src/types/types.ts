import SbColorValue from "../storyboarding/values/sbColorValue";
import SbVectorValue from "../storyboarding/values/sbVectorValue";
import { ESbElementEasing, ESbElementLoopType, ESbElementOrigin, ESbElementProperty, ESbLayer, ESbLayerId } from "./enums";
import { Expand } from "./utils";

type TSbLayerData<T> = {
	title: string;
	elements: T[];
};

type TSbLayersBuilder<T extends string, E> = {
	[key in T]: TSbLayerData<E>;
};

type TUnstrictStoryboardElementData = {
	path: string;
	layer?: ESbLayer;
	origin?: ESbElementOrigin;
	defaultPosition?: SbVectorValue;
};

type TStoryboardElementData = {
	path: string;
	layer: ESbLayer;
	origin: ESbElementOrigin;
	defaultPosition: SbVectorValue;
};

type TStoryboardElementAnimationData = {
	frameCount: number;
	frameDelay: number;
	loopType?: string;
};

type TStoryboardElementSampleData = {
	path: string;
	startTime: number;
	layer: ESbLayerId;
	volume: number;
};

type TStoryboardElementDefaultProps = {
	easing?: ESbElementEasing;
	startTime: number;
	endTime?: number;
};

type TStoryboardElementProperties = Array<TStoryboardElementPropertyItem<ESbElementProperty>> & {
	getProperty: <T extends ESbElementProperty>(index: number) => TStoryboardElementPropertyItem<T>;
};

type TStoryboardElementLoop = {
	startTime: number;
	loopCount: number;
	loopedProperties: () => TStoryboardElementProperties | undefined;
};

type TStoryboardElementTrigger = {
	triggerName: string;
	startTime: number;
	endTime: number;
	triggeredProperties: () => TStoryboardElementProperties | undefined;
};

type TStoryboardElementMove = Expand<
	{
		startPosition: SbVectorValue;
		endPosition?: SbVectorValue;
	} & TStoryboardElementDefaultProps
>;

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
	startParameter: TStoryboardElementParametersTypes;
} & TStoryboardElementDefaultProps;

type TStoryboardElementPropertiesWrapper = {
	properties: TStoryboardElementProperties | undefined;
};

type TStoryboardElementPropertyGroupMap = {
	[ESbElementProperty.L]: TStoryboardElementLoop & TStoryboardElementPropertiesWrapper;
	[ESbElementProperty.T]: TStoryboardElementTrigger & TStoryboardElementPropertiesWrapper;
};
type TStoryboardElementPropertyMap = {
	[ESbElementProperty.M]: TStoryboardElementMove;
	[ESbElementProperty.MX]: TStoryboardElementMoveX;
	[ESbElementProperty.MY]: TStoryboardElementMoveY;
	[ESbElementProperty.R]: TStoryboardElementRotate;
	[ESbElementProperty.F]: TStoryboardElementFade;
	[ESbElementProperty.S]: TStoryboardElementScale;
	[ESbElementProperty.V]: TStoryboardElementScaleVec;
	[ESbElementProperty.C]: TStoryboardElementColor;
	[ESbElementProperty.P]: TStoryboardElementParameters;
} & TStoryboardElementPropertyGroupMap;

type TStoryboardElementPropertyItem<T extends ESbElementProperty> = {
	type: T;
	data: TStoryboardElementPropertyMap[T];
	toString: () => string;
};

type TStoryboardSpriteLineParams = [string, ESbLayer, ESbElementOrigin, string, number, number];
type TStoryboardAnimationParams = [
	string,
	ESbLayer,
	ESbElementOrigin,
	string,
	number,
	number,
	number,
	number,
	ESbElementLoopType
];
type TStoryboardSampleParams = [string, number, ESbLayerId, string, number];
type TStoryboardElementDefaultParams = [string, ESbElementEasing, number, number];
type TStoryboardElementDefaultNumericParams = [...TStoryboardElementDefaultParams, number, number];

export type {
	TSbLayersBuilder,
	TSbLayerData,
	TUnstrictStoryboardElementData,
	TStoryboardElementProperties,
	TStoryboardElementData,
	TStoryboardElementAnimationData,
	TStoryboardElementSampleData,
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
	TStoryboardElementTrigger,
	TStoryboardElementPropertyItem,
	TStoryboardElementPropertyMap,
	TStoryboardElementPropertyGroupMap,
	TStoryboardSpriteLineParams,
	TStoryboardAnimationParams,
	TStoryboardSampleParams,
	TStoryboardElementDefaultParams,
	TStoryboardElementDefaultNumericParams
};
