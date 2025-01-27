import { describe, it, expect } from "vitest";
import { SbVectorValue, SbColorValue, SbEmptyElement } from "../../src";
import { TStoryboardElementParameters, TStoryboardElementTrigger } from "../../src/types/types";
import { ESbElementEasing, ESbElementProperty } from "../../src/types/enums";
import { convertPropertyToString, arrayOfUndefinedToNull } from "../../src/utils/converters";

describe("convertPropertyToString", () => {
	it("should convert move property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startPosition: new SbVectorValue({ x: 0, y: 0 }),
			endPosition: new SbVectorValue({ x: 100, y: 100 })
		};
		expect(convertPropertyToString.move(data)).toBe("M,0,0,1000,0,0,100,100");
	});

	it("should convert moveX property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startPositionX: 0,
			endPositionX: 100
		};
		expect(convertPropertyToString.moveX(data)).toBe("MX,0,0,1000,0,100");
	});

	it("should convert moveY property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startPositionY: 0,
			endPositionY: 100
		};
		expect(convertPropertyToString.moveY(data)).toBe("MY,0,0,1000,0,100");
	});

	it("should convert rotate property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startRotation: 0,
			endRotation: 180
		};
		expect(convertPropertyToString.rotate(data)).toBe("R,0,0,1000,0,180");
	});

	it("should convert fade property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startFade: 0,
			endFade: 1
		};
		expect(convertPropertyToString.fade(data)).toBe("F,0,0,1000,0,1");
	});

	it("should convert scale property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startScale: 1,
			endScale: 2
		};
		expect(convertPropertyToString.scale(data)).toBe("S,0,0,1000,1,2");
	});

	it("should convert scaleVec property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startScaleVec: new SbVectorValue({ x: 1, y: 1 }),
			endScaleVec: new SbVectorValue({ x: 2, y: 2 })
		};
		expect(convertPropertyToString.scaleVec(data)).toBe("V,0,0,1000,1,1,2,2");
	});

	it("should convert color property to string", () => {
		const data = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startColor: new SbColorValue({ r: 255, g: 128, b: 64 }),
			endColor: new SbColorValue({ r: 128, g: 64, b: 32 })
		};
		expect(convertPropertyToString.color(data)).toBe("C,0,0,1000,255,128,64,128,64,32");
	});

	it("should convert parameters property to string", () => {
		const data: TStoryboardElementParameters = {
			easing: ESbElementEasing.Linear,
			startTime: 0,
			endTime: 1000,
			startParameter: "H"
		};
		expect(convertPropertyToString.parameters(data)).toBe("P,0,0,1000,H");
	});

	it("should convert loop property with nested properties to string", () => {
		const loopElement = new SbEmptyElement();
		loopElement
			.scale({
				startTime: 0,
				endTime: 200,
				startScale: 0.25,
				endScale: 0.5
			})
			.move({
				easing: ESbElementEasing.OutExpo,
				startTime: 200,
				endTime: 400,
				startPosition: new SbVectorValue({ x: 320, y: 240 }),
				endPosition: new SbVectorValue({ x: 500, y: 240 })
			});

		const data = {
			startTime: 640000,
			loopCount: 20,
			loopedProperties: () => loopElement.getProperties()
		};

		const loopString = convertPropertyToString.loop(data);
		expect(loopString).toBe("L,640000,20");

		const scaleProperty = loopElement.getProperties()?.getProperty<ESbElementProperty.S>(0).data;
		if (scaleProperty) {
			const scaleString = convertPropertyToString.scale(scaleProperty);
			expect(scaleString).toBe("S,0,0,200,0.25,0.5");
		}

		const moveProperty = loopElement.getProperties()?.getProperty<ESbElementProperty.M>(1).data;
		if (moveProperty) {
			const moveString = convertPropertyToString.move(moveProperty);
			expect(moveString).toBe("M,19,200,400,320,240,500,240");
		}
	});

	it("should convert trigger property to string", () => {
		const data: TStoryboardElementTrigger = {
			triggerName: "HitSound",
			startTime: 0,
			endTime: 1000,
			triggeredProperties: () => {
				const triggerElement = new SbEmptyElement();
				return triggerElement.getProperties();
			}
		};
		expect(convertPropertyToString.trigger(data)).toBe("T,HitSound,0,1000");
	});
});

describe("arrayOfUndefinedToNull", () => {
	it("should convert undefined elements to null", () => {
		const array = [1, undefined, 2];
		expect(arrayOfUndefinedToNull(array)).toEqual([1, null, 2]);
	});
});
