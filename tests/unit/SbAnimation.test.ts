import { describe, it, expect } from "vitest";
import { SbAnimation, SbVectorValue, SbEmptyElement } from "../../src";
import { ESbLayer, ESbElementOrigin, ESbElementLoopType, ESbElementProperty, ESbElementEasing } from "../../src/types/enums";

describe("SbAnimation", () => {
	it("should initialize with correct values", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		expect(animation.getType()).toBe("Animation");
		expect(animation.getData().path).toBe("anim.png");
		expect(animation.getData().layer).toBe(ESbLayer.Background);
		expect(animation.getData().origin).toBe(ESbElementOrigin.Centre);
		expect(animation.getData().defaultPosition).toEqual(new SbVectorValue({ x: 320, y: 240 }));
		expect(animation.getFrameCount()).toBe(10);
		expect(animation.getFrameDelay()).toBe(100);
		expect(animation.getLoopType()).toBe(ESbElementLoopType.LoopForever);
	});

	it("should return correct title", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});
		const data = animation.getData();
		expect(animation.getTitle(data)).toBe('Animation,Background,Centre,"anim.png",320,240,10,100,LoopForever');
	});

	it("should handle movement", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation.move({
			startTime: 1000,
			endTime: 2000,
			startPosition: new SbVectorValue({ x: 320, y: 240 }),
			endPosition: new SbVectorValue({ x: 400, y: 300 })
		});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(1);
		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.M);
			expect(properties[0].toString()).toBe("M,0,1000,2000,320,240,400,300");
		}
	});

	it("should handle scaling", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation.scale({
			startTime: 1000,
			endTime: 2000,
			startScale: 0.5,
			endScale: 1.0
		});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(1);
		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.S);
			expect(properties[0].toString()).toBe("S,0,1000,2000,0.5,1");
		}
	});

	it("should handle rotation", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation.rotate({
			startTime: 1000,
			endTime: 2000,
			startRotation: 0,
			endRotation: 180
		});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(1);
		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.R);
			expect(properties[0].toString()).toBe("R,0,1000,2000,0,180");
		}
	});

	it("should handle fading", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation.fade({
			startTime: 1000,
			endTime: 2000,
			startFade: 0,
			endFade: 1
		});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(1);
		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.F);
			expect(properties[0].toString()).toBe("F,0,1000,2000,0,1");
		}
	});

	it("should handle complex transformations", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation
			.move({
				startTime: 1000,
				endTime: 2000,
				startPosition: new SbVectorValue({ x: 320, y: 240 }),
				endPosition: new SbVectorValue({ x: 400, y: 300 })
			})
			.scale({
				startTime: 2000,
				endTime: 3000,
				startScale: 0.5,
				endScale: 1.0
			})
			.rotate({
				startTime: 3000,
				endTime: 4000,
				startRotation: 0,
				endRotation: 180
			})
			.fade({
				startTime: 4000,
				endTime: 5000,
				startFade: 0,
				endFade: 1
			});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(4);
	});

	it("should handle loop", () => {
		const animation = new SbAnimation({
			path: "anim.png",
			layer: ESbLayer.Background,
			origin: ESbElementOrigin.Centre,
			defaultPosition: new SbVectorValue({ x: 320, y: 240 }),
			frameCount: 10,
			frameDelay: 100,
			loopType: ESbElementLoopType.LoopForever
		});

		animation.loop({
			startTime: 1000,
			loopCount: 10,
			loopedProperties: () => {
				const loop = new SbEmptyElement();
				loop.scale({
					startTime: 0,
					endTime: 200,
					startScale: 0.25,
					endScale: 0.5
				}).move({
					easing: ESbElementEasing.OutExpo,
					startTime: 200,
					endTime: 400,
					startPosition: new SbVectorValue({ x: 320, y: 240 }),
					endPosition: new SbVectorValue({ x: 500, y: 240 })
				});
				return loop.getProperties();
			}
		});

		const properties = animation.getProperties();
		expect(properties).toHaveLength(1);
		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.L);
			expect(properties[0].toString()).toBe("L,1000,10");
		}
	});
});
