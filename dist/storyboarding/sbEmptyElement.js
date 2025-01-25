"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storyboardElement_1 = __importDefault(require("./storyboardElement"));
class SbEmptyElement extends storyboardElement_1.default {
    constructor() {
        super({ path: "" });
    }
    toString() {
        return "";
    }
}
exports.default = SbEmptyElement;
