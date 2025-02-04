import { describe, it, expect } from "vitest";
import { SbVectorValue } from "../../src";

describe("SbVectorValue", () => {
	it("should initialize with correct values", () => {
		const vector = new SbVectorValue({ x: 10, y: 20, z: 30 });
		expect(vector.getX()).toBe(10);
		expect(vector.getY()).toBe(20);
		expect(vector.getZ()).toBe(30);
	});

	it("should return null for missing values", () => {
		const vector = new SbVectorValue({ x: null, y: null, z: null });
		expect(vector.getX()).toBe(null);
		expect(vector.getY()).toBe(null);
		expect(vector.getZ()).toBe(null);
	});

	it("should return correct vector object", () => {
		const vector = new SbVectorValue({ x: 5, y: 15 });
		expect(vector.get()).toEqual({ x: 5, y: 15, z: null });
	});

	it("should convert to string correctly", () => {
		const vector = new SbVectorValue({ x: 1, y: 2, z: 3 });
		expect(vector.toString()).toBe("1,2,3");
	});

	it("should handle null values in toString", () => {
		const vector = new SbVectorValue({ x: 1, y: null, z: 3 });
		expect(vector.toString()).toBe("1,3");
	});
});
