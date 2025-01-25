"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const converters_1 = require("../utils/converters");
const sbVectorValue_1 = __importDefault(require("./values/sbVectorValue"));
class StoryboardElement {
    #data;
    #properties = [];
    constructor({ path = "", layer = enums_1.ESbLayer.Background, origin = enums_1.ESbElementOrigin.Centre, defaultPosition = new sbVectorValue_1.default({ x: 320, y: 240 }), }) {
        this.#data = {
            path,
            layer,
            origin,
            defaultPosition,
        };
    }
    getData() {
        return this.#data;
    }
    getProperties() {
        return this.#properties;
    }
    #addProperty(type, data, convertType) {
        const updatedData = { easing: enums_1.ESbElementEasing.Linear, ...data };
        this.#properties.push({
            type, data: updatedData, toString: () => converters_1.convertPropertyToString[convertType](updatedData)
        });
        return this;
    }
    loop(data) {
        return this.#addProperty(enums_1.ESbElementProperty.L, { properties: data.loopedProperties(), ...data }, "loop");
    }
    trigger(data) {
        return this.#addProperty(enums_1.ESbElementProperty.T, { properties: data.triggeredProperties(), ...data }, "trigger");
    }
    move(data) {
        return this.#addProperty(enums_1.ESbElementProperty.M, data, "move");
    }
    moveX(data) {
        return this.#addProperty(enums_1.ESbElementProperty.MX, data, "moveX");
    }
    moveY(data) {
        return this.#addProperty(enums_1.ESbElementProperty.MY, data, "moveY");
    }
    rotate(data) {
        return this.#addProperty(enums_1.ESbElementProperty.R, data, "rotate");
    }
    fade(data) {
        return this.#addProperty(enums_1.ESbElementProperty.F, data, "fade");
    }
    scale(data) {
        return this.#addProperty(enums_1.ESbElementProperty.S, data, "scale");
    }
    scaleVec(data) {
        return this.#addProperty(enums_1.ESbElementProperty.V, data, "scaleVec");
    }
    color(data) {
        return this.#addProperty(enums_1.ESbElementProperty.C, data, "color");
    }
    flipH(data) {
        const startParameter = "H";
        return this.#addProperty(enums_1.ESbElementProperty.P, { ...data, startParameter }, "parameters");
    }
    flipV(data) {
        const startParameter = "V";
        return this.#addProperty(enums_1.ESbElementProperty.P, { ...data, startParameter }, "parameters");
    }
    additive(data) {
        const startParameter = "A";
        return this.#addProperty(enums_1.ESbElementProperty.P, { ...data, startParameter }, "parameters");
    }
}
exports.default = StoryboardElement;
