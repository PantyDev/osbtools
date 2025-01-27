import { getNumberOrNull } from "../../utils/checks";

class SbVectorValue {
    #x: number | null;
    #y: number | null;
    #z: number | null = null;
    constructor({
        x = null, y = null, z = null
    }: {
        x: number | null,
        y: number | null,
        z?: number | null;
    }) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    toString(): string {
        return [getNumberOrNull(this.#x), getNumberOrNull(this.#y), getNumberOrNull(this.#z)].filter(x => x !== null).join(",");
    }
}

export default SbVectorValue;