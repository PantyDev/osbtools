import { describe, it, expect } from "vitest";
import { Storyboard, SbSprite, SbVectorValue } from "../../src";
import { ESbLayer, ESbElementOrigin, ESbElementProperty } from "../../src/types/enums";

describe("Storyboard", () => {
    it("should add elements to the storyboard", () => {
        const storyboard = new Storyboard();
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });

        storyboard.addElement(sprite);
        const elements = storyboard.getElements();
        expect(elements.length).toBe(1);
        expect(elements[0]).toBe(sprite);
    });

    it("should parse storyboard from string", () => {
        const osbString = `
        [Events]
//Background and Video events
//Storyboard Layer 0 (Background)
Sprite,Background,Centre,"sprite.png",320,240
 M,0,0,1000,0,0,100,100
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
        `;
        const storyboard = new Storyboard(osbString);
        const elements = storyboard.getElements();
        expect(elements.length).toBe(1);
        expect(elements[0].getData().path).toBe("sprite.png");

        const properties = elements[0].getProperties();
        if(properties) {
            expect(properties.length).toBe(1);
            expect(properties[0].type).toBe(ESbElementProperty.M);
        }
    });

    it("should return string representation of the storyboard", () => {
        const storyboard = new Storyboard();
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });
        storyboard.addElement(sprite);
        const storyboardString = storyboard.toString();
        expect(storyboardString).toContain("[Events]");
        expect(storyboardString).toContain("Sprite,Background,Centre,\"sprite.png\",320,240");
    });
});
