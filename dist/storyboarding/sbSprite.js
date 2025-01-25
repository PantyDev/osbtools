"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const storyboardElement_1 = __importDefault(require("./storyboardElement"));
class SbSprite extends storyboardElement_1.default {
    constructor({ path, layer, origin, defaultPosition, }) {
        super({ path, layer, origin, defaultPosition });
    }
    getTitle(data) {
        const { layer, origin, path, defaultPosition } = data;
        return ["Sprite", layer, origin, `"${path}"`, defaultPosition.toString()].join(",");
    }
    toString() {
        const title = this.getTitle(this.getData());
        const properties = this.getProperties().map(property => {
            const title = ` ${property.toString()}`;
            if ([enums_1.ESbElementProperty.L, enums_1.ESbElementProperty.T].includes(property.type)) {
                const loopedProperties = property.data
                    .properties?.map(property => `  ${property.toString()}`).join("\n");
                return [title, loopedProperties].join("\n");
            }
            return title;
        });
        return [
            title,
            ...properties
        ].join("\n");
    }
}
exports.default = SbSprite;
