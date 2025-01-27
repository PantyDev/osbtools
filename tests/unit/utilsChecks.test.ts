import { describe, it, expect } from "vitest";
import { getNumberOrNull } from "../../src/utils/checks";

describe("getNumberOrNull", () => {
	it("should return the number if it is valid", () => {
		expect(getNumberOrNull(5)).toBe(5);
	});

	it("should return null for NaN", () => {
		expect(getNumberOrNull(NaN)).toBe(null);
	});

	it("should return null for undefined", () => {
		expect(getNumberOrNull(undefined)).toBe(null);
	});

	it("should return null for null", () => {
		expect(getNumberOrNull(null)).toBe(null);
	});
});
