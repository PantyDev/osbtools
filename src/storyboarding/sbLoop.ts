import { ESbElementProperty } from "../types/enums";
import { TStoryboardElementLoop } from "../types/types";
import StoryboardElement from "./storyboardElement";

class SbLoop extends StoryboardElement {
    constructor() {
        super({ path: "" });
    }

    toString(): string {
        return "";
    }
}

export default SbLoop;