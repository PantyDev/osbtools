import { describe, it, expect } from "vitest";
import { SbSample } from "../../src";
import { ESbLayerId } from "../../src/types/enums";

describe("SbSample", () => {
	it("should initialize with correct values", () => {
		const sample = new SbSample({
			path: "audio.mp3",
			startTime: 1000,
			layer: ESbLayerId.Background,
			volume: 100
		});

		expect(sample.getType()).toBe("Sample");
		expect(sample.getData().path).toBe("audio.mp3");
		expect(sample.getStartTime()).toBe(1000);
		expect(sample.getLayer()).toBe(ESbLayerId.Background);
		expect(sample.getVolume()).toBe(100);
	});

	it("should return correct title", () => {
		const sample = new SbSample({
			path: "audio.mp3",
			startTime: 1000,
			layer: ESbLayerId.Background,
			volume: 100
		});
		const data = sample.getData();
		expect(sample.getTitle(data)).toBe('Sample,1000,0,"audio.mp3",100');
	});
});
