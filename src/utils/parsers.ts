import SbAnimation from "../storyboarding/sbAnimation";
import SbSample from "../storyboarding/sbSample";
import SbSprite from "../storyboarding/sbSprite";
import StoryboardElement from "../storyboarding/storyboardElement";
import SbColorValue from "../storyboarding/values/sbColorValue";
import SbVectorValue from "../storyboarding/values/sbVectorValue";
import { ESbElementProperty, ESbElementType } from "../types/enums";
import { TStoryboardAnimationParams, TStoryboardElementDefaultNumericParams, TStoryboardElementDefaultParams, TStoryboardElementParametersTypes, TStoryboardSampleParams, TStoryboardSpriteLineParams } from "../types/types";

const parseElementTitle = (line: string, type: ESbElementType, cb: (element: StoryboardElement | null) => void) => {
    if(line.startsWith(type)) {
        let currentElement = null;
        switch(type) {
            case ESbElementType.Sprite: {
                const [_, layer, origin, path, posX, posY] = 
                line.split(",") as TStoryboardSpriteLineParams;
        
                currentElement = new SbSprite({ 
                    path: path.slice(1, -1), 
                    layer, 
                    origin, 
                    defaultPosition: new SbVectorValue({ x: posX, y: posY }) 
                });
                break;
            }
            case ESbElementType.Animation: {
                const [_, layer, origin, path, posX, posY, frameCount, frameDelay, loopType] = 
                    line.split(",") as TStoryboardAnimationParams;
    
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
                const [_, startTime, layer, path, volume] = 
                    line.split(",") as TStoryboardSampleParams;
    
                currentElement = new SbSample({ 
                    startTime, layer, path: path.slice(1, -1), volume
                });
                break;
            }
        }

        cb(currentElement);
    }
};

const parseElementProperty = (line: string, type: ESbElementProperty, element: StoryboardElement) => {
    if(line.startsWith(type)) {
        switch(type) {
            case ESbElementProperty.M: {
                const [_, easing, startTime, endTime, startPosX, startPosY, endPosX, endPosY] = line.split(",") as [...TStoryboardElementDefaultNumericParams, number, number];
                element.move({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startPosition: new SbVectorValue({ x: startPosX, y: startPosY }),
                    endPosition: new SbVectorValue({ x: endPosX, y: endPosY })
                })
                break;
            }
            case ESbElementProperty.MX: {
                const [_, easing, startTime, endTime, startPositionX, endPositionX] = line.split(",") as TStoryboardElementDefaultNumericParams;
                element.moveX({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startPositionX,
                    endPositionX
                })
                break;
            }
            case ESbElementProperty.MY: {
                const [_, easing, startTime, endTime, startPositionY, endPositionY] = line.split(",") as TStoryboardElementDefaultNumericParams;
                element.moveY({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startPositionY,
                    endPositionY
                })
                break;
            }
            case ESbElementProperty.R: {
                const [_, easing, startTime, endTime, startRotation, endRotation] = line.split(",") as TStoryboardElementDefaultNumericParams;
                element.rotate({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startRotation,
                    endRotation
                })
                break;
            }
            case ESbElementProperty.F: {
                const [_, easing, startTime, endTime, startFade, endFade] = line.split(",") as TStoryboardElementDefaultNumericParams;
                element.fade({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startFade,
                    endFade
                })
                break;
            }
            case ESbElementProperty.S: {
                const [_, easing, startTime, endTime, startScale, endScale] = line.split(",") as TStoryboardElementDefaultNumericParams;
                element.scale({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startScale,
                    endScale
                })
                break;
            }
            case ESbElementProperty.V: {
                const [_, easing, startTime, endTime,  startScaleX, startScaleY, endScaleX, endScaleY] = line.split(",") as [...TStoryboardElementDefaultNumericParams, number, number];
                element.scaleVec({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startScaleVec: new SbVectorValue({ x: startScaleX, y: startScaleY }),
                    endScaleVec: new SbVectorValue({ x: endScaleX, y: endScaleY })
                })
                break;
            }
            case ESbElementProperty.C: {
                const [_, easing, startTime, endTime, startColorR, startColorG, startColorB, endColorR, endColorG, endColorB] = line.split(",") as [...TStoryboardElementDefaultNumericParams, number, number, number, number];
                element.color({ 
                    easing, 
                    startTime, 
                    endTime, 
                    startColor: new SbColorValue({ r: startColorR, g: startColorG, b: startColorB }),
                    endColor: new SbColorValue({ r: endColorR, g: endColorG, b: endColorB })
                })
                break;
            }
            case ESbElementProperty.P: {
                const [_, easing, startTime, endTime, parameterType] = line.split(",") as [...TStoryboardElementDefaultParams, TStoryboardElementParametersTypes];
                const setCustomProperty = ({
                    H: () => {
                        element.flipH({ 
                            easing, 
                            startTime, 
                            endTime
                        })
                    },
                    V: () => {
                        element.flipV({ 
                            easing, 
                            startTime, 
                            endTime
                        })
                    },
                    A: () => {
                        element.additive({ 
                            easing, 
                            startTime, 
                            endTime
                        })
                    }
                }[parameterType]);
                if(setCustomProperty) setCustomProperty();

                break;
            }
        }
    }
};

const parseElementGroupProperty = (line: string, type: ESbElementProperty, element: StoryboardElement, groupElement: StoryboardElement) => {
    switch(type) {
        case ESbElementProperty.L: {
            const [_, startTime, loopCount] = line.split(",") as [string, number, number];
            element.loop({ 
                startTime,
                loopCount,
                loopedProperties() {
                    return groupElement.getProperties();
                },
            })
            break;
        }
        case ESbElementProperty.T: {
            const [_, triggerName, startTime, endTime] = line.split(",") as [string, string, number, number];
            element.trigger({ 
                startTime,
                endTime,
                triggerName,
                triggeredProperties() {
                    return groupElement.getProperties();
                },
            })
            break;
        }
    }
};


export { parseElementTitle, parseElementProperty, parseElementGroupProperty };