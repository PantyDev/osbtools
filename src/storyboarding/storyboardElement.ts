import { ESbLayer, ESbElementOrigin, ESbElementProperty, ESbElementEasing } from "../types/enums";
import {
	TStoryboardElementColor,
	TStoryboardElementData,
	TStoryboardElementDefaultProps,
	TStoryboardElementFade,
	TStoryboardElementLoop,
	TStoryboardElementMove,
	TStoryboardElementMoveX,
	TStoryboardElementMoveY,
	TStoryboardElementProperties,
	TStoryboardElementPropertyItem,
	TStoryboardElementPropertyMap,
	TStoryboardElementRotate,
	TStoryboardElementScale,
	TStoryboardElementScaleVec,
	TStoryboardElementTrigger,
	TUnstrictStoryboardElementData
} from "../types/types";
import { UnionToIntersection } from "../types/utils";
import { convertPropertyToString } from "../utils/converters";
import SbVectorValue from "./values/sbVectorValue";

abstract class StoryboardElement {
	#data: TStoryboardElementData;
	#properties: TStoryboardElementProperties = [] as unknown as TStoryboardElementProperties;

	constructor({
		path = "",
		layer = ESbLayer.Background,
		origin = ESbElementOrigin.Centre,
		defaultPosition = new SbVectorValue({ x: 320, y: 240 })
	}: TUnstrictStoryboardElementData) {
		this.#data = {
			path,
			layer,
			origin,
			defaultPosition
		};
		this.#properties.getProperty = function <T extends ESbElementProperty>(index: number) {
			return this[index] as TStoryboardElementPropertyItem<T>;
		};
	}

	getData(): TStoryboardElementData {
		return this.#data;
	}

	getProperties(): TStoryboardElementProperties | undefined {
		return this.#properties;
	}

	getProperty<T extends ESbElementProperty>(
		index: number,
		cb?: (property: TStoryboardElementPropertyItem<T>) => TStoryboardElementPropertyItem<T>
	): TStoryboardElementPropertyItem<T> {
		if (cb) this.#properties[index] = cb(this.#properties[index] as TStoryboardElementPropertyItem<T>);
		return this.#properties[index] as TStoryboardElementPropertyItem<T>;
	}

	#addProperty<T extends ESbElementProperty>(
		type: T,
		data: TStoryboardElementPropertyMap[T],
		convertType: keyof typeof convertPropertyToString
	) {
		const updatedData: TStoryboardElementPropertyMap[T] = {
			easing: ESbElementEasing.Linear,
			...data
		};
		type TStoryboardElementPropertiesIntersection = UnionToIntersection<
			TStoryboardElementPropertyMap[keyof TStoryboardElementPropertyMap]
		>;

		this.#properties.push({
			type,
			data: updatedData,
			toString: () => convertPropertyToString[convertType](updatedData as TStoryboardElementPropertiesIntersection)
		});

		return this;
	}

	loop(data: TStoryboardElementLoop) {
		const loopData = {
			...data,
			properties: data.loopedProperties()
		};
		return this.#addProperty(ESbElementProperty.L, loopData, "loop");
	}

	trigger(data: TStoryboardElementTrigger) {
		const triggerData = {
			...data,
			properties: data.triggeredProperties()
		};
		return this.#addProperty(ESbElementProperty.T, triggerData, "trigger");
	}

	move(data: TStoryboardElementMove): StoryboardElement {
		return this.#addProperty(ESbElementProperty.M, data, "move");
	}

	moveX(data: TStoryboardElementMoveX): StoryboardElement {
		return this.#addProperty(ESbElementProperty.MX, data, "moveX");
	}

	moveY(data: TStoryboardElementMoveY): StoryboardElement {
		return this.#addProperty(ESbElementProperty.MY, data, "moveY");
	}

	rotate(data: TStoryboardElementRotate): StoryboardElement {
		return this.#addProperty(ESbElementProperty.R, data, "rotate");
	}

	fade(data: TStoryboardElementFade): StoryboardElement {
		return this.#addProperty(ESbElementProperty.F, data, "fade");
	}

	scale(data: TStoryboardElementScale): StoryboardElement {
		return this.#addProperty(ESbElementProperty.S, data, "scale");
	}

	scaleVec(data: TStoryboardElementScaleVec): StoryboardElement {
		return this.#addProperty(ESbElementProperty.V, data, "scaleVec");
	}

	color(data: TStoryboardElementColor): StoryboardElement {
		return this.#addProperty(ESbElementProperty.C, data, "color");
	}

	flipH(data: TStoryboardElementDefaultProps): StoryboardElement {
		const startParameter = "H";
		return this.#addProperty(ESbElementProperty.P, { ...data, startParameter }, "parameters");
	}

	flipV(data: TStoryboardElementDefaultProps): StoryboardElement {
		const startParameter = "V";
		return this.#addProperty(ESbElementProperty.P, { ...data, startParameter }, "parameters");
	}

	additive(data: TStoryboardElementDefaultProps): StoryboardElement {
		const startParameter = "A";
		return this.#addProperty(ESbElementProperty.P, { ...data, startParameter }, "parameters");
	}

	abstract toString(): string;
}

export default StoryboardElement;
