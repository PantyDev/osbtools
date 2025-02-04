import { describe, it, expect } from "vitest";
import { SbColorValue, SbEmptyElement, SbSprite, SbVectorValue } from "../../src";
import { ESbLayer, ESbElementOrigin, ESbElementProperty, ESbElementEasing } from "../../src/types/enums";

describe("SbSprite", () => {
	it("should initialize with correct values", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		expect(sprite.getType()).toBe("Sprite");
		expect(sprite.getData().path).toBe("bg.png");
		expect(sprite.getData().layer).toBe(ESbLayer.Foreground);
		expect(sprite.getData().origin).toBe(ESbElementOrigin.Centre);
		expect(sprite.getData().defaultPosition).toEqual(new SbVectorValue({ x: 320, y: 240 }));
	});

	it("should return correct title", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		const data = sprite.getData();
		expect(sprite.getTitle(data)).toBe('Sprite,Foreground,Centre,"bg.png",320,240');
	});

	it("should convert to string correctly", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.move({
			startTime: 0,
			endTime: 1000,
			startPosition: new SbVectorValue({ x: 320, y: 240 })
		});

		expect(sprite.toString()).toBe(['Sprite,Foreground,Centre,"bg.png",320,240', " M,0,0,1000,320,240"].join("\n"));
	});

	it("should handle movement", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.move({
			startTime: 1000,
			endTime: 2000,
			startPosition: new SbVectorValue({ x: 320, y: 240 }),
			endPosition: new SbVectorValue({ x: 400, y: 300 })
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe("M");
			expect(properties[0].toString()).toBe("M,0,1000,2000,320,240,400,300");
		}
	});

	it("should handle scaling", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.scale({
			startTime: 1000,
			endTime: 2000,
			startScale: 0.5,
			endScale: 1.0
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe("S");
			expect(properties[0].toString()).toBe("S,0,1000,2000,0.5,1");
		}
	});

	it("should handle rotation", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.rotate({
			startTime: 1000,
			endTime: 2000,
			startRotation: 0,
			endRotation: 180
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe("R");
			expect(properties[0].toString()).toBe("R,0,1000,2000,0,180");
		}
	});

	it("should handle fading", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.fade({
			startTime: 1000,
			endTime: 2000,
			startFade: 0,
			endFade: 1
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe("F");
			expect(properties[0].toString()).toBe("F,0,1000,2000,0,1");
		}
	});

	it("should handle complex transformations", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite
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

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(4);
	});

	it("should handle horizontal flipping", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.flipH({
			startTime: 1000,
			endTime: 2000
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.P);
			expect(properties[0].toString()).toBe("P,0,1000,2000,H");
		}
	});

	it("should handle vertical flipping", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.flipV({
			startTime: 1000,
			endTime: 2000
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.P);
			expect(properties[0].toString()).toBe("P,0,1000,2000,V");
		}
	});

	it("should handle additive blending", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.additive({
			startTime: 1000,
			endTime: 2000
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.P);
			expect(properties[0].toString()).toBe("P,0,1000,2000,A");
		}
	});

	it("should update exist times correctly", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.fade({
			startTime: 1000,
			endTime: 2000,
			startFade: 0,
			endFade: 1
		});
		sprite.scale({
			startTime: 500,
			endTime: 2500,
			startScale: 0.5,
			endScale: 1.0
		});

		expect(sprite.getData().existStartTime).toBe(500);
		expect(sprite.getData().existEndTime).toBe(2500);
	});

	it("should handle color change", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.color({
			startTime: 1000,
			endTime: 2000,
			startColor: new SbColorValue({ r: 255, g: 0, b: 0 }),
			endColor: new SbColorValue({ r: 0, g: 255, b: 0 })
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.C);
			expect(properties[0].toString()).toBe("C,0,1000,2000,255,0,0,0,255,0");
		}
	});

	it("should handle vertical and horizontal movement", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.moveX({
			startTime: 1000,
			endTime: 2000,
			startPositionX: 320,
			endPositionX: 400
		});
		sprite.moveY({
			startTime: 1000,
			endTime: 2000,
			startPositionY: 240,
			endPositionY: 300
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(2);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.MX);
			expect(properties[1].type).toBe(ESbElementProperty.MY);
			expect(properties[0].toString()).toBe("MX,0,1000,2000,320,400");
			expect(properties[1].toString()).toBe("MY,0,1000,2000,240,300");
		}
	});

	it("should handle loop", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.loop({
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

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.L);
			expect(properties[0].toString()).toBe("L,1000,10");
			expect(
				properties.getProperty<ESbElementProperty.L>(0).data.properties?.getProperty<ESbElementProperty.S>(0).toString()
			).toBe("S,0,0,200,0.25,0.5");
		}
	});

	it("should handle trigger", () => {
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.trigger({
			triggerName: "Passing",
			startTime: 0,
			endTime: 10000,
			triggeredProperties: () => {
				const trigger = new SbEmptyElement();
				trigger
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
				return trigger.getProperties();
			}
		});

		const properties = sprite.getProperties();
		expect(properties).toHaveLength(1);

		if (properties) {
			expect(properties[0].type).toBe(ESbElementProperty.T);
			expect(properties[0].toString()).toBe("T,Passing,0,10000");
		}
	});
});
