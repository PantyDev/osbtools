import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementLoop } from "../types/types";
import StoryboardElement from "./storyboardElement";

class SbLoop extends StoryboardElement {
    constructor() {
        super({ path: "" });
    }

    toString(): string {
        const {
            layer,
            origin,
            path,
            defaultPosition
        } = this.getData();

        const title = ["Sprite",layer,origin,`"${path}"`,defaultPosition.toString()].join(",");

        const properties = this.getProperties().map(property => [` ${property.toString()}`, ...(() => {
            if(property.type !== ESbElementProperty.L) return [];
            return (property.data as TStoryboardElementLoop).properties?.map(property => `  ${property.toString()}`) || [];
        })()].join("\n"))

        return [
            title,
            ...properties
        ].join("\n")
    }
}

export default SbLoop;