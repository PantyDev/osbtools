"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOrNull = void 0;
const getNumberOrNull = (number) => !Number.isNaN(number) && number !== null && number !== undefined ? number : null;
exports.getNumberOrNull = getNumberOrNull;
