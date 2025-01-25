import { isNumber } from "../../utils/checks";

class SbColorValue {
    #r: number;
    #g: number;
    #b: number;
    constructor({
        r = 0, g = 0, b = 0
    }: {
        r: number,
        g: number,
        b: number;
    }) {
        this.#r = r;
        this.#g = g;
        this.#b = b;
    }

    toString(): string {
        return [isNumber(this.#r), isNumber(this.#g), isNumber(this.#b)].filter(x => x !== null).join(",");
    }
}

export default SbColorValue;