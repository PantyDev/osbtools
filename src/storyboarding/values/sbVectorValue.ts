import { isNumber } from "../../utils/checks";

class SbVectorValue {
    #x: number;
    #y: number;
    #z: number | null = null;
    constructor({
        x = 0, y = 0, z = null
    }: {
        x: number,
        y: number,
        z?: number | null;
    }) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    toString(): string | null {
        return [isNumber(this.#x), isNumber(this.#y), isNumber(this.#z)].filter(x => x !== null).join(",");
    }
}

export default SbVectorValue;