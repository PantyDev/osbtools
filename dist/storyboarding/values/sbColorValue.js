"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../../utils/checks");
class SbColorValue {
    #r;
    #g;
    #b;
    constructor({ r = 0, g = 0, b = 0 }) {
        this.#r = r;
        this.#g = g;
        this.#b = b;
    }
    toString() {
        return [(0, checks_1.getNumberOrNull)(this.#r), (0, checks_1.getNumberOrNull)(this.#g), (0, checks_1.getNumberOrNull)(this.#b)].filter(x => x !== null).join(",");
    }
}
exports.default = SbColorValue;
