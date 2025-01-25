"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const sbSprite_1 = __importDefault(require("./sbSprite"));
class SbSample extends sbSprite_1.default {
    #startTime = 0;
    #layer = 0;
    #volume = 0;
    constructor({ path, startTime, layer, volume }) {
        super({ path, layer: enums_1.ESbLayer.Sound });
        this.#startTime = startTime;
        this.#layer = layer;
        this.#volume = volume;
    }
    getTitle(data) {
        const { path, } = data;
        return ["Sample", this.#startTime, this.#layer, `"${path}"`, this.#volume].join(",");
    }
}
exports.default = SbSample;
