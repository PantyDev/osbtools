import { SbAnimation, SbEmptyElement, SbSprite, SbVectorValue, Storyboard } from "../src";
import { ESbElementEasing, ESbElementLoopType, ESbLayer } from "../src/types/enums";
import fs from 'fs'

const sb = new Storyboard();

const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

sprite
    .move({
        startTime: 633191,
        startPosition: new SbVectorValue({ x: 320, y: 240 })
    })
    .scale({
        easing: ESbElementEasing.Linear,
        startTime: 633209,
        endTime: 634646,
        startScale: 0.28,
        endScale: 1
    })
    .move({
        easing: ESbElementEasing.OutExpo,
        startTime: 634646,
        endTime: 637646,
        startPosition: new SbVectorValue({ x: 320, y: 240 }),
        endPosition: new SbVectorValue({ x: 500, y: 240 })
    })
    .scale({
        easing: ESbElementEasing.OutExpo,
        startTime: 637646,
        endTime: 640000,
        startScale: 1,
        endScale: 0.25
    })
    .loop({
        startTime: 640000,
        loopCount: 20,
        loopedProperties: () => {
            const loop = new SbEmptyElement();
            loop
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
                })
            return loop.getProperties();
        }
    })
    .flipH({
        startTime: 633191,
    })
    .flipV({
        startTime: 633191,
    })
    .additive({
        startTime: 633191,
    })

const animation = new SbAnimation({ path: "bg.png", layer: ESbLayer.Background, frameCount: 20, frameDelay: 100, loopType: ESbElementLoopType.LoopForever });
animation
    .move({
        startTime: 633191,
        startPosition: new SbVectorValue({ x: 320, y: 240 })
    })
    .trigger({
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
        },
    })

console.log("add sprite: ", sb.addElement(sprite));
console.log("\n\nadd animations: ", sb.addElement(animation));
console.log("\n\nelements: ", sb.getElements());
console.log("\n\nlayers: ", sb.getLayers());
console.log("\n\nstring: ", sb.toString());
const osb = sb.toString();

fs.writeFileSync(
    './example.osb',
    osb,
    'utf-8',
)