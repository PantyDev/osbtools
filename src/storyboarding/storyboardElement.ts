import { ESbLayer, ESbElementOrigin, ESbElementProperty, ESbElementEasing } from "../types/enums";
import { TStoryboardElementColor, TStoryboardElementData, TStoryboardElementDefaultProps, TStoryboardElementFade, TStoryboardElementLoop, TStoryboardElementMove, TStoryboardElementMoveX, TStoryboardElementMoveY, TStoryboardElementParameters, TStoryboardElementPropertyItem, TStoryboardElementPropertyMap, TStoryboardElementRotate, TStoryboardElementScale, TStoryboardElementScaleVec, TUnstrictStoryboardElementData } from "../types/types";
import { UnionToIntersection } from "../types/utils";
import { convertPropertyToString } from "../utils/converters";
import SbVectorValue from "./values/sbVectorValue";

abstract class StoryboardElement {
    #data: TStoryboardElementData;
    #properties: TStoryboardElementPropertyItem<ESbElementProperty>[] = [];

    constructor({
        path = "", 
        layer = ESbLayer.Background, 
        origin = ESbElementOrigin.Centre, 
        defaultPosition = new SbVectorValue({ x: 320, y: 240 }), 
    }: TUnstrictStoryboardElementData) {
        this.#data = {
            path,
            layer,
            origin,
            defaultPosition,
        };
    }

    getData(): TStoryboardElementData {
        return this.#data;
    }

    getProperties(): TStoryboardElementPropertyItem<ESbElementProperty>[] {
        return this.#properties;
    }

    #addProperty<T extends ESbElementProperty>(type: T, data: TStoryboardElementPropertyMap[T], convertType: keyof typeof convertPropertyToString) {  
        const updatedData: TStoryboardElementPropertyMap[T] = { easing: ESbElementEasing.Linear, ...data };
        type TStoryboardElementProperties = UnionToIntersection<TStoryboardElementPropertyMap[keyof TStoryboardElementPropertyMap]>;
        
        this.#properties.push({
            type, data: updatedData, toString: () => convertPropertyToString[convertType](updatedData as TStoryboardElementProperties)
        })

        return this;
    }

    loop(data: TStoryboardElementLoop) {
        return this.#addProperty(ESbElementProperty.L, { properties: data.loopedProperties(), ...data }, "loop");
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
        return this.#addProperty(ESbElementProperty.P, {...data, startParameter }, "parameters");
    }

    flipV(data: TStoryboardElementDefaultProps): StoryboardElement {
        const startParameter = "V";
        return this.#addProperty(ESbElementProperty.P, {...data, startParameter }, "parameters");
    }

    additive(data: TStoryboardElementDefaultProps): StoryboardElement {
        const startParameter = "A";
        return this.#addProperty(ESbElementProperty.P, {...data, startParameter }, "parameters");
    }

    abstract toString(): string
}

export default StoryboardElement;