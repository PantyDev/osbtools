import { ESbLayer } from "../types/enums";
import { TSbLayerData, TSbLayersBuilder } from "../types/types";
import StoryboardElement from "./storyboardElement";

const layerData = (title: string): TSbLayerData<StoryboardElement> => ({
    title,
    elements: []
})

type TLayers = TSbLayersBuilder<ESbLayer, StoryboardElement>;

class Storyboard {
    readonly #elements: StoryboardElement[] = [];
    readonly #layers: TLayers = {
        [ESbLayer.Background]: layerData("//Storyboard Layer 0 (Background)"),
        [ESbLayer.Fail]: layerData("//Storyboard Layer 1 (Fail)"),
        [ESbLayer.Pass]: layerData("//Storyboard Layer 2 (Pass)"),
        [ESbLayer.Foreground]: layerData("//Storyboard Layer 3 (Foreground)"),
        [ESbLayer.Overlay]: layerData("//Storyboard Layer 4 (Overlay)"),
        [ESbLayer.Sound]: layerData("//Storyboard Sound Samples"),
    } as const;

    constructor() {}

    addElement(element: StoryboardElement): Storyboard {
        this.#elements.push(element);
        this.#layers[element.getData().layer].elements.push(element);
        return this;
    }

    getElements(): StoryboardElement[] {
        return this.#elements;
    }

    getLayers(): TLayers {
        return this.#layers;
    }

    toString(): string {
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
        ].join("\n")
    } 
}

export default Storyboard;