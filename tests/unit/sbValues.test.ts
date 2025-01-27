import { describe, it, expect } from "vitest";
import { SbColorValue, SbVectorValue } from "../../src";

describe("SbColorValue", () => {
	it("should return a comma-separated string of color values", () => {
		const color = new SbColorValue({ r: 255, g: 128, b: 64 });
		expect(color.toString()).toBe("255,128,64");
	});

	it("should filter out null values", () => {
		const color = new SbColorValue({ r: 255, g: null, b: 64 });
		expect(color.toString()).toBe("255,64");
	});
});

describe("SbVectorValue", () => {
	it("should return a comma-separated string of vector values", () => {
		const vector = new SbVectorValue({ x: 100, y: 200 });
		expect(vector.toString()).toBe("100,200");
	});

	it("should handle optional z value", () => {
		const vector = new SbVectorValue({ x: 100, y: 200, z: 300 });
		expect(vector.toString()).toBe("100,200,300");
	});
});
