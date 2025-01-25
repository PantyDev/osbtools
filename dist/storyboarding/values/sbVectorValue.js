"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../../utils/checks");
class SbVectorValue {
    #x;
    #y;
    #z = null;
    constructor({ x = 0, y = 0, z = null }) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }
    toString() {
        return [(0, checks_1.getNumberOrNull)(this.#x), (0, checks_1.getNumberOrNull)(this.#y), (0, checks_1.getNumberOrNull)(this.#z)].filter(x => x !== null).join(",");
    }
}
exports.default = SbVectorValue;
