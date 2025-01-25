"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../types/enums");
const layerData = (title) => ({
    title,
    elements: []
});
class Storyboard {
    #elements = [];
    #layers = {
        [enums_1.ESbLayer.Background]: layerData("//Storyboard Layer 0 (Background)"),
        [enums_1.ESbLayer.Fail]: layerData("//Storyboard Layer 1 (Fail)"),
        [enums_1.ESbLayer.Pass]: layerData("//Storyboard Layer 2 (Pass)"),
        [enums_1.ESbLayer.Foreground]: layerData("//Storyboard Layer 3 (Foreground)"),
        [enums_1.ESbLayer.Overlay]: layerData("//Storyboard Layer 4 (Overlay)"),
        [enums_1.ESbLayer.Sound]: layerData("//Storyboard Sound Samples"),
    };
    constructor() { }
    addElement(element) {
        this.#elements.push(element);
        this.#layers[element.getData().layer].elements.push(element);
        return this;
    }
    getElements() {
        return this.#elements;
    }
    getLayers() {
        return this.#layers;
    }
    toString() {
        return [
            "[Events]",
            "//Background and Video events",
            ...Object.entries(this.getLayers()).map(([_, layerData]) => {
                const { title, elements } = layerData ?? {};
                return [
                    title,
                    ...elements.map(element => element.toString())
                ].join("\n");
            })
        ].join("\n");
    }
}
exports.default = Storyboard;
