import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementData, TStoryboardElementLoop, TUnstrictStoryboardElementData } from "../types/types";
import StoryboardElement from "./storyboardElement";

class SbSprite extends StoryboardElement {
    constructor({
        path, 
        layer, 
        origin, 
        defaultPosition, 
    }: TUnstrictStoryboardElementData) {
        super({ path, layer, origin, defaultPosition });
    }

    getTitle(data: TStoryboardElementData): string {
        const {
            layer,
            origin,
            path,
            defaultPosition
        } = data;

        return ["Sprite",layer,origin,`"${path}"`,defaultPosition.toString()].join(",");
    }

    toString(): string {
        const title = this.getTitle(this.getData());

        const properties = this.getProperties().map(property => {
            const title = ` ${property.toString()}`;
            if(property.type === ESbElementProperty.L) {
                const loopedProperties = (property.data as TStoryboardElementLoop).properties?.map(property => `  ${property.toString()}`).join("\n");
                return [title, loopedProperties].join("\n")
            }
            return title;
        });

        return [
            title,
            ...properties
        ].join("\n");
    }
}

export default SbSprite;