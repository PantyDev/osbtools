import SbAnimation from "../storyboarding/sbAnimation";
import SbSample from "../storyboarding/sbSample";
import SbSprite from "../storyboarding/sbSprite";
import StoryboardElement from "../storyboarding/storyboardElement";
import SbColorValue from "../storyboarding/values/sbColorValue";
import SbVectorValue from "../storyboarding/values/sbVectorValue";
import { ESbElementProperty, ESbElementType } from "../types/enums";
import {
	TStoryboardAnimationParams,
	TStoryboardElementDefaultNumericParams,
	TStoryboardElementDefaultParams,
	TStoryboardElementParametersTypes,
	TStoryboardSampleParams,
	TStoryboardSpriteLineParams
} from "../types/types";

const tryToParseStringArrayToNumber = (lines: string[]) =>
	lines.map((item) => {
		const isSomethingStrange = isNaN(Number(item)) || item === "";
		const strangeItem = item === "" ? undefined : item;
		return isSomethingStrange ? strangeItem : Number(item);
	});
const parseElementTitle = (line: string, type: ESbElementType, cb: (element: StoryboardElement | null) => void) => {
	if (line.startsWith(type)) {
		let currentElement = null;
		switch (type) {
			case ESbElementType.Sprite: {
				const [, layer, origin, path, posX, posY] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardSpriteLineParams;

				currentElement = new SbSprite({
					path: path.slice(1, -1),
					layer,
					origin,
					defaultPosition: new SbVectorValue({ x: posX, y: posY })
				});
				break;
			}
			case ESbElementType.Animation: {
				const [, layer, origin, path, posX, posY, frameCount, frameDelay, loopType] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardAnimationParams;

				currentElement = new SbAnimation({
					path: path.slice(1, -1),
					layer,
					origin,
					defaultPosition: new SbVectorValue({ x: posX, y: posY }),
					frameCount,
					frameDelay,
					loopType
				});
				break;
			}
			case ESbElementType.Sample: {
				const [, startTime, layer, path, volume] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardSampleParams;

				currentElement = new SbSample({
					startTime,
					layer,
					path: path.slice(1, -1),
					volume
				});
				break;
			}
		}

		cb(currentElement);
	}
};

const parseElementProperty = (line: string, type: ESbElementProperty, element: StoryboardElement) => {
	if (line.startsWith(type)) {
		switch (type) {
			case ESbElementProperty.M: {
				const [, easing, startTime, endTime, startPosX, startPosY, endPosX, endPosY] = tryToParseStringArrayToNumber(
					line.split(",")
				) as [...TStoryboardElementDefaultNumericParams, number, number];
				element.move({
					easing,
					startTime,
					endTime,
					startPosition: new SbVectorValue({
						x: startPosX,
						y: startPosY
					}),
					endPosition: new SbVectorValue({ x: endPosX, y: endPosY })
				});
				break;
			}
			case ESbElementProperty.MX: {
				const [, easing, startTime, endTime, startPositionX, endPositionX] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardElementDefaultNumericParams;
				element.moveX({
					easing,
					startTime,
					endTime,
					startPositionX,
					endPositionX
				});
				break;
			}
			case ESbElementProperty.MY: {
				const [, easing, startTime, endTime, startPositionY, endPositionY] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardElementDefaultNumericParams;
				element.moveY({
					easing,
					startTime,
					endTime,
					startPositionY,
					endPositionY
				});
				break;
			}
			case ESbElementProperty.R: {
				const [, easing, startTime, endTime, startRotation, endRotation] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardElementDefaultNumericParams;
				element.rotate({
					easing,
					startTime,
					endTime,
					startRotation,
					endRotation
				});
				break;
			}
			case ESbElementProperty.F: {
				const [, easing, startTime, endTime, startFade, endFade] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardElementDefaultNumericParams;
				element.fade({
					easing,
					startTime,
					endTime,
					startFade,
					endFade
				});
				break;
			}
			case ESbElementProperty.S: {
				const [, easing, startTime, endTime, startScale, endScale] = tryToParseStringArrayToNumber(
					line.split(",")
				) as TStoryboardElementDefaultNumericParams;
				element.scale({
					easing,
					startTime,
					endTime,
					startScale,
					endScale
				});
				break;
			}
			case ESbElementProperty.V: {
				const [, easing, startTime, endTime, startScaleX, startScaleY, endScaleX, endScaleY] =
					tryToParseStringArrayToNumber(line.split(",")) as [...TStoryboardElementDefaultNumericParams, number, number];
				element.scaleVec({
					easing,
					startTime,
					endTime,
					startScaleVec: new SbVectorValue({
						x: startScaleX,
						y: startScaleY
					}),
					endScaleVec: new SbVectorValue({
						x: endScaleX,
						y: endScaleY
					})
				});
				break;
			}
			case ESbElementProperty.C: {
				const [, easing, startTime, endTime, startColorR, startColorG, startColorB, endColorR, endColorG, endColorB] =
					tryToParseStringArrayToNumber(line.split(",")) as [
						...TStoryboardElementDefaultNumericParams,
						number,
						number,
						number,
						number
					];
				element.color({
					easing,
					startTime,
					endTime,
					startColor: new SbColorValue({
						r: startColorR,
						g: startColorG,
						b: startColorB
					}),
					endColor: new SbColorValue({
						r: endColorR,
						g: endColorG,
						b: endColorB
					})
				});
				break;
			}
			case ESbElementProperty.P: {
				const [, easing, startTime, endTime, parameterType] = tryToParseStringArrayToNumber(line.split(",")) as [
					...TStoryboardElementDefaultParams,
					TStoryboardElementParametersTypes
				];
				const setCustomProperty = {
					H: () => {
						element.flipH({
							easing,
							startTime,
							endTime
						});
					},
					V: () => {
						element.flipV({
							easing,
							startTime,
							endTime
						});
					},
					A: () => {
						element.additive({
							easing,
							startTime,
							endTime
						});
					}
				}[parameterType];
				if (setCustomProperty) setCustomProperty();

				break;
			}
		}
	}
};

const parseElementGroupProperty = (
	line: string,
	type: ESbElementProperty,
	element: StoryboardElement,
	groupElement: StoryboardElement
) => {
	switch (type) {
		case ESbElementProperty.L: {
			const [, startTime, loopCount] = tryToParseStringArrayToNumber(line.split(",")) as [string, number, number];
			element.loop({
				startTime,
				loopCount,
				loopedProperties() {
					return groupElement.getProperties();
				}
			});
			break;
		}
		case ESbElementProperty.T: {
			const [, triggerName, startTime, endTime] = tryToParseStringArrayToNumber(line.split(",")) as [
				string,
				string,
				number,
				number
			];
			element.trigger({
				startTime,
				endTime,
				triggerName,
				triggeredProperties() {
					return groupElement.getProperties();
				}
			});
			break;
		}
	}
};

export { parseElementTitle, parseElementProperty, parseElementGroupProperty };
