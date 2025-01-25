"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPropertyToString = void 0;
const enums_1 = require("../types/enums");
const checks_1 = require("./checks");
const filterAndConvertProperty = (data) => data
    .filter(x => x !== null)
    .join(",");
const convertPropertyToString = {
    move: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.M, data.easing, data.startTime, data.endTime, data.startPosition.toString(), data.endPosition?.toString() || null]),
    moveX: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.MX, data.easing, data.startTime, data.endTime, (0, checks_1.getNumberOrNull)(data.startPositionX), (0, checks_1.getNumberOrNull)(data?.endPositionX)]),
    moveY: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.MY, data.easing, data.startTime, data.endTime, (0, checks_1.getNumberOrNull)(data.startPositionY), (0, checks_1.getNumberOrNull)(data?.endPositionY)]),
    rotate: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.R, data.easing, data.startTime, data.endTime, (0, checks_1.getNumberOrNull)(data.startRotation), (0, checks_1.getNumberOrNull)(data.endRotation)]),
    fade: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.F, data.easing, data.startTime, data.endTime, (0, checks_1.getNumberOrNull)(data.startFade), (0, checks_1.getNumberOrNull)(data?.endFade)]),
    scale: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.S, data.easing, data.startTime, data.endTime, (0, checks_1.getNumberOrNull)(data.startScale), (0, checks_1.getNumberOrNull)(data?.endScale)]),
    scaleVec: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.V, data.easing, data.startTime, data.endTime, data.startScaleVec.toString(), data?.endScaleVec?.toString() || null]),
    color: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.C, data.easing, data.startTime, data.endTime, data.startColor.toString(), data.endColor?.toString() || null]),
    parameters: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.P, data.easing, data.startTime, data.endTime, data.startParameter || null]),
    loop: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.L, data.startTime, data.loopCount]),
    trigger: (data) => filterAndConvertProperty([enums_1.ESbElementProperty.T, data.triggerName, data.startTime, data.endTime])
};
exports.convertPropertyToString = convertPropertyToString;
