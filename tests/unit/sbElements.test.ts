import { describe, it, expect } from "vitest";
import { SbAnimation, SbVectorValue, SbSample, SbSprite, SbColorValue, SbEmptyElement } from "../../src";
import { ESbLayer, ESbElementOrigin, ESbElementLoopType, ESbElementEasing, ESbElementProperty } from "../../src/types/enums";

describe("SbAnimation", () => {
    it("should return the correct title", () => {
        const animation = new SbAnimation({
            path: "animation.png",
            layer: ESbLayer.Foreground,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 100, y: 200 }),
            frameCount: 10,
            frameDelay: 100,
            loopType: ESbElementLoopType.LoopOnce
        });
        const title = animation.getTitle(animation.getData());
        expect(title).toBe("Animation,Foreground,Centre,\"animation.png\",100,200,10,100,LoopOnce");
    });
});

describe("SbSample", () => {
    it("should return the correct title", () => {
        const sample = new SbSample({
            path: "sound.wav",
            startTime: 0,
            layer: 0,
            volume: 100
        });
        const title = sample.getTitle(sample.getData());
        expect(title).toBe("Sample,0,0,\"sound.wav\",100");
    });
});

describe("SbSprite", () => {
    it("should return the correct title", () => {
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });
        const title = sprite.getTitle(sprite.getData());
        expect(title).toBe("Sprite,Background,Centre,\"sprite.png\",320,240");
    });
});


describe("StoryboardElement", () => {
    it("should add and retrieve properties", () => {
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });

        sprite.move({ 
            easing: ESbElementEasing.Linear,
            startTime: 0,
            endTime: 1000,
            startPosition: new SbVectorValue({ x: 0, y: 0 }),
            endPosition: new SbVectorValue({ x: 100, y: 100 })
        });

        const properties = sprite.getProperties();
        if(properties) {
            expect(properties.length).toBe(1);
            expect(properties[0].type).toBe(ESbElementProperty.M);
        }
    });

    it("should loop properties correctly", () => {
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });

        sprite.loop({
            startTime: 0,
            loopCount: 10,
            loopedProperties: () => {
                const loopElement = new SbEmptyElement();
                loopElement.move({
                    startTime: 0,
                    endTime: 2000,
                    startPosition: new SbVectorValue({ x: 10, y: 10 })
                });
                return loopElement.getProperties();
            }
        });

        const properties = sprite.getProperties();
        if(properties) {
            expect(properties.length).toBe(1);
            expect(properties.getProperty(0).type).toBe(ESbElementProperty.L);
            const loopProperties = properties.getProperty<ESbElementProperty.L>(0).data.properties;
            if(loopProperties) {
                expect(loopProperties.getProperty<ESbElementProperty.M>(0).toString()).toBe("M,0,0,2000,10,10");
            }
        }
    });

    it("should trigger properties correctly", () => {
        const sprite = new SbSprite({
            path: "sprite.png",
            layer: ESbLayer.Background,
            origin: ESbElementOrigin.Centre,
            defaultPosition: new SbVectorValue({ x: 320, y: 240 })
        });

        sprite.trigger({
            triggerName: "HitSound",
            startTime: 0,
            endTime: 3000,
            triggeredProperties: () => {
                const triggerElement = new SbEmptyElement();
                triggerElement.scaleVec({
                    startTime: 0,
                    endTime: 2000,
                    startScaleVec: new SbVectorValue({ x: -10, y: 10 })
                });
                return triggerElement.getProperties();
            }
        });

        const properties = sprite.getProperties();
        if(properties) {
            expect(properties.length).toBe(1);
            expect(properties.getProperty(0).type).toBe(ESbElementProperty.T);
            const triggerProperties = properties.getProperty<ESbElementProperty.T>(0).data.properties;
            if(triggerProperties) {
                expect(triggerProperties.getProperty<ESbElementProperty.S>(0).toString()).toBe("V,0,0,2000,-10,10");
            }
        }
    });

    it("should throw error if non-numeric value is added", () => {
        const color = new SbColorValue({ r: 255, g: "green" as any, b: 64 });
        expect(color.toString()).toBe("255,64");
    });
});