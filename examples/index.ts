import { SbAnimation, SbEmptyElement, SbSample, SbSprite, SbVectorValue, Storyboard } from "../src";
import { ESbElementEasing, ESbElementLoopType, ESbLayer, ESbLayerId } from "../src/types/enums";
import fs from "fs";

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
	.rotate({
		startTime: 637646,
		endTime: 640000,
		startRotation: 0,
		endRotation: 3
	})
	.fade({
		startTime: 637646,
		endTime: 640000,
		startFade: 0,
		endFade: 1
	})
	.moveX({
		startTime: 637646,
		endTime: 640000,
		startPositionX: 0,
		endPositionX: 1
	})
	.moveY({
		startTime: 637646,
		endTime: 640000,
		startPositionY: 0,
		endPositionY: 1
	})
	.loop({
		startTime: 640000,
		loopCount: 20,
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
	})
	.flipH({
		startTime: 633191
	})
	.flipV({
		startTime: 633191
	})
	.additive({
		startTime: 633191
	});

console.log(sprite.getData().existStartTime, sprite.getData().existEndTime);
console.log(sprite.getPropertiesByLayer());
const animation = new SbAnimation({
	path: "bg.png",
	layer: ESbLayer.Background,
	frameCount: 20,
	frameDelay: 100,
	loopType: ESbElementLoopType.LoopForever
});
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
		}
	});

const sound = new SbSample({ path: "audio.mp3", startTime: 906554, layer: ESbLayerId.Background, volume: 100 });

const testSprite = new SbSprite({ path: "bg.png", layer: ESbLayer.Background });

for (let i = 0; i < 10; i++) {
	testSprite.move({
		easing: ESbElementEasing.InExpo,
		startTime: 906554 + i * 200,
		endTime: 906554 + (i + 1) * 200,
		startPosition: new SbVectorValue({ x: 320 + i * 5, y: 240 }),
		endPosition: new SbVectorValue({ x: 320 + (i + 1) * 5, y: 240 })
	});
}

sb.addElement(testSprite);

console.log(animation.getType());
console.log("add sprite: ", sb.addElement(sprite));
console.log("\n\nadd animations: ", sb.addElement(animation));
console.log("\n\nadd sounds: ", sb.addElement(sound));
console.log("\n\nelements: ", sb.getElements());
console.log("\n\nlayers: ", sb.getLayers());
console.log("\n\nstring: ", sb.toString());
const osb = sb.toString();

fs.writeFileSync("./example.osb", osb, "utf-8");
