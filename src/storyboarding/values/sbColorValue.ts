import { getNumberOrNull } from "../../utils/checks";

class SbColorValue {
	#r: number | null;
	#g: number | null;
	#b: number | null;
	constructor({ r, g, b }: { r: number | null; g: number | null; b: number | null }) {
		this.#r = r;
		this.#g = g;
		this.#b = b;
	}

	toString(): string {
		return [getNumberOrNull(this.#r), getNumberOrNull(this.#g), getNumberOrNull(this.#b)].filter((x) => x !== null).join(",");
	}
}

export default SbColorValue;
