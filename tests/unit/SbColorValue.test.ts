import { describe, it, expect } from "vitest";
import { SbColorValue } from "../../src";

describe("SbColorValue", () => {
	it("should initialize with correct values", () => {
		const color = new SbColorValue({ r: 255, g: 0, b: 128 });
		expect(color.getR()).toBe(255);
		expect(color.getG()).toBe(0);
		expect(color.getB()).toBe(128);
	});

	it("should return null for missing values", () => {
		const color = new SbColorValue({ r: null, g: null, b: null });
		expect(color.getR()).toBe(null);
		expect(color.getG()).toBe(null);
		expect(color.getB()).toBe(null);
	});

	it("should return correct color object", () => {
		const color = new SbColorValue({ r: 128, g: 64, b: 32 });
		expect(color.get()).toEqual({ r: 128, g: 64, b: 32 });
	});

	it("should convert to string correctly", () => {
		const color = new SbColorValue({ r: 255, g: 255, b: 0 });
		expect(color.toString()).toBe("255,255,0");
	});

	it("should handle null values in toString", () => {
		const color = new SbColorValue({ r: 255, g: null, b: 0 });
		expect(color.toString()).toBe("255,0");
	});
});
