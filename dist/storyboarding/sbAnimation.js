"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const sbSprite_1 = __importDefault(require("./sbSprite"));
class SbAnimation extends sbSprite_1.default {
    #frameCount = 0;
    #frameDelay = 0;
    #loopType = enums_1.ESbElementLoopType.LoopForever;
    constructor({ path, layer, origin, defaultPosition, frameCount, frameDelay, loopType = enums_1.ESbElementLoopType.LoopForever }) {
        super({ path, layer, origin, defaultPosition });
        this.#frameCount = frameCount;
        this.#frameDelay = frameDelay;
        this.#loopType = loopType;
    }
    getTitle(data) {
        const { layer, origin, path, defaultPosition } = data;
        return ["Animation", layer, origin, `"${path}"`, defaultPosition.toString(), this.#frameCount, this.#frameDelay, this.#loopType].join(",");
    }
}
exports.default = SbAnimation;
