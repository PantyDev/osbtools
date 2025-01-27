# osbtools

A set of tools for working with osu! storyboards. 

## Table of contents

* [Getting started](#Getting-started)
* [Examples of use](#Examples-of-use)
    - [Create a sprite](#Create-a-sprite)
    - [Properties for sprite control](#Properties-for-sprite-control)
    - [Create loop](#Create-loop)
    - [Create trigger](#Create-trigger)
    - [Create animation](#Create-animation)
    - [Create sample](#Create-sample)
    - [Parse osb file](#Parse-osb-file)
    - [Get element's property](#Get-elements-property)
* [Documentation](#Documentation)

## Getting started

```bash
npm i osbtools@latest
```

## Examples of use

### Create a sprite
```ts
import { SbSprite, Storyboard } from "../src";
import { ESbLayer } from "../src/types/enums";

// create storyboard
const sb = new Storyboard();

// create sprite
const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

// add sprite to storyboard
sb.addElement(sprite);

// convert storyboard to .osb format
const osb = sb.toString();
```

### Properties for sprite control
```ts
import { SbSprite, SbVectorValue } from "../src";
import { ESbElementEasing, ESbLayer } from "../src/types/enums";

// create sprite
const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

sprite
// move sprite in X and Y axes
    .move({
        startTime: 0,
        startPosition: new SbVectorValue({ x: 320, y: 240 })
    })
// move sprite only in X axis
    .moveX({
        startTime: 0,
        startPositionX: 320
    })
// move sprite only in Y axis
    .moveY({
        startTime: 0,
        startPositionY: 320
    })
// proportional sprite scaling
    .scale({
        easing: ESbElementEasing.Linear,
        startTime: 0,
        endTime: 200,
        startScale: 0,
        endScale: 1
    })
// change sprite transparency
    .fade({
        easing: ESbElementEasing.Linear,
        startTime: 0,
        endTime: 200,
        startFade: 0,
        endFade: 1
    })
// sprite rotating
    .rotate({
        easing: ESbElementEasing.Linear,
        startTime: 0,
        endTime: 200,
        startRotation: 0,
        endRotation: 3.14
    })
// vector sprite scaling by x and y axes
    .scaleVec({
        easing: ESbElementEasing.Linear,
        startTime: 0,
        endTime: 200,
        startScaleVec: new SbVectorValue({ x: 1, y: 1 }),
        endScaleVec: new SbVectorValue({ x: 1.5, y: 1 })
    })
// change color of sprite
    .color({
        easing: ESbElementEasing.Linear,
        startTime: 0,
        endTime: 200,
        startColor: new SbColorValue({ r: 255, g: 255, b: 255 }),
        endColor: new SbColorValue({ r: 255, g: 255, b: 255 })
    })
// horizontally flip sprite
    .flipH({
        startTime: 633191,
    })
// vertically flip sprite
    .flipV({
        startTime: 633191,
    })
// additive sprite effect
    .additive({
        startTime: 633191,
    })
```

### Create loop
```ts
import { SbEmptyElement, SbSprite, SbVectorValue } from "../src";
import { ESbElementEasing, ESbLayer } from "../src/types/enums";

// create sprite
const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

// create loop
sprite
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
```

### Create trigger
```ts
import { SbEmptyElement, SbSprite, SbVectorValue } from "../src";
import { ESbElementEasing, ESbLayer } from "../src/types/enums";

// create sprite
const sprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Foreground });

// create trigger
sprite
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
```

### Create animation
```ts
import { SbAnimation } from "../src";
import { ESbElementLoopType, ESbLayer } from "../src/types/enums";

// create sprite
const animation = new SbAnimation({ path: "bg.png", layer: ESbLayer.Background, frameCount: 20, frameDelay: 100, loopType: ESbElementLoopType.LoopForever });
```

### Create sample
```ts
import { SbSample } from "../src";
import { ESbLayerId } from "../src/types/enums";

// create sprite
const sound = new SbSample({ path: "audio.mp3", startTime: 906554, layer: ESbLayerId.Background, volume: 100 });
```

### Parse osb file
```ts
import { Storyboard } from "../src";

const osb = `
[Events]
//Background and Video events
//Storyboard Layer 0 (Background)
Animation,Background,Centre,"bg.png",320,240,20,100,LoopForever
 M,0,633191,,320,240
 T,Passing,0,10000
  S,0,0,200,0.25,0.5
  M,19,200,400,320,240,500,240
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
`

// create parsed storyboard
const sb = new Storyboard(osb);

// create new parsed storyboard
const sb = new Storyboard();
const newSb = sb.parse(osb);
```

### Get element's property
```ts
// get element's property
sb.getElement(2)?.getProperty(2);

// get element's group property
sb.getElement(2)?.getProperty<ESbElementProperty.L>(8).data.properties?.getProperty(0);
```

## Documentation

WIP