import { describe, it, expect } from "vitest";
import { Storyboard, SbSprite, SbVectorValue } from "../../src";
import { ESbLayer, ESbElementProperty } from "../../src/types/enums";

describe("Storyboard", () => {
	it("should initialize with empty layers and elements", () => {
		const storyboard = new Storyboard();
		const elements = storyboard.getElements();
		const layers = storyboard.getLayers();

		expect(elements).toHaveLength(0);
		Object.keys(layers).forEach((layer) => {
			expect(layers[layer].elements).toHaveLength(0);
		});
	});

	it("should add elements correctly", () => {
		const storyboard = new Storyboard();
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

		storyboard.addElement(sprite);
		const elements = storyboard.getElements();
		const layers = storyboard.getLayers();

		expect(elements).toHaveLength(1);
		expect(layers[ESbLayer.Foreground].elements).toHaveLength(1);
	});

	it("should parse osb correctly", () => {
		const osbContent = `
[Events]
//Background and Video events
Sprite,Foreground,Centre,"bg.png",320,240
 M,0,1000,2000,320,240,400,300
`;

		const storyboard = new Storyboard(osbContent);
		const elements = storyboard.getElements();
		const layers = storyboard.getLayers();

		expect(elements).toHaveLength(1);
		expect(layers[ESbLayer.Foreground].elements).toHaveLength(1);
		expect(elements[0].getType()).toBe("Sprite");
		expect(elements[0].getProperties()?.getProperty(0).type).toBe(ESbElementProperty.M);
	});

	it("should handle adding multiple elements", () => {
		const storyboard = new Storyboard();
		const sprite1 = new SbSprite({ path: "bg1.png", layer: ESbLayer.Background });
		const sprite2 = new SbSprite({ path: "bg2.png", layer: ESbLayer.Foreground });

		storyboard.addElement(sprite1);
		storyboard.addElement(sprite2);
		const elements = storyboard.getElements();
		const layers = storyboard.getLayers();

		expect(elements).toHaveLength(2);
		expect(layers[ESbLayer.Background].elements).toHaveLength(1);
		expect(layers[ESbLayer.Foreground].elements).toHaveLength(1);
	});

	it("should convert to string correctly", () => {
		const storyboard = new Storyboard();
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });
		sprite.move({
			startTime: 1000,
			endTime: 2000,
			startPosition: new SbVectorValue({ x: 320, y: 240 }),
			endPosition: new SbVectorValue({ x: 400, y: 300 })
		});

		storyboard.addElement(sprite);
		const osbString = storyboard.toString();

		const expectedString = [
			"[Events]",
			"//Background and Video events",
			"//Storyboard Layer 0 (Background)",
			"//Storyboard Layer 1 (Fail)",
			"//Storyboard Layer 2 (Pass)",
			"//Storyboard Layer 3 (Foreground)",
			'Sprite,Foreground,Centre,"bg.png",320,240',
			" M,0,1000,2000,320,240,400,300",
			"//Storyboard Layer 4 (Overlay)",
			"//Storyboard Sound Samples"
		].join("\n");

		expect(osbString).toBe(expectedString);
	});

	it("should get element by index", () => {
		const storyboard = new Storyboard();
		const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

		storyboard.addElement(sprite);
		const element = storyboard.getElement(0);

		expect(element).not.toBeNull();
		expect(element?.getType()).toBe("Sprite");
	});

	it("should return null for invalid element index", () => {
		const storyboard = new Storyboard();
		const element = storyboard.getElement(0);

		expect(element).toBeNull();
	});
});
