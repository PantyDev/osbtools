import { ESbLayer, ESbLayerId } from "../types/enums";
import { TStoryboardElementData, TStoryboardElementSampleData } from "../types/types";
import SbSprite from "./sbSprite";

class SbSample extends SbSprite {
    #startTime: number = 0;
    #layer: ESbLayerId = 0;
    #volume: number = 0;

    constructor({
        path, 
        startTime,
        layer,
        volume
    }:  TStoryboardElementSampleData) {
        super({ path, layer: ESbLayer.Sound });

        this.#startTime = startTime;
        this.#layer = layer;
        this.#volume = volume;
    }

    getTitle(data: TStoryboardElementData): string {
        const {
            path,
        } = data;

        return ["Sample", this.#startTime, this.#layer, `"${path}"`, this.#volume].join(",");
    }
}

export default SbSample;