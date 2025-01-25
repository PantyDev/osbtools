import { ESbElementLoopType } from "../types/enums";
import { TStoryboardElementAnimationData, TStoryboardElementData, TUnstrictStoryboardElementData } from "../types/types";
import SbSprite from "./sbSprite";

class SbAnimation extends SbSprite {
    #frameCount: number = 0;
    #frameDelay: number = 0;
    #loopType?: string = ESbElementLoopType.LoopForever;

    constructor({
        path, 
        layer, 
        origin, 
        defaultPosition,
        frameCount,
        frameDelay,
        loopType = ESbElementLoopType.LoopForever
    }: TUnstrictStoryboardElementData & TStoryboardElementAnimationData) {
        super({ path, layer, origin, defaultPosition });

        this.#frameCount = frameCount;
        this.#frameDelay = frameDelay;
        this.#loopType = loopType;
    }

    getTitle(data: TStoryboardElementData): string {
        const {
            layer,
            origin,
            path,
            defaultPosition
        } = data;

        return ["Animation",layer,origin,`"${path}"`,defaultPosition.toString(), this.#frameCount, this.#frameDelay, this.#loopType].join(",");
    }
}

export default SbAnimation;