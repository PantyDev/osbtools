import { ESbElementType } from "../types/enums";
import StoryboardElement from "./storyboardElement";

class SbEmptyElement extends StoryboardElement {
	type: ESbElementType = ESbElementType.Empty;
	constructor() {
		super({ path: "" });
	}

	toString(): string {
		return "";
	}
}

export default SbEmptyElement;
