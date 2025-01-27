import StoryboardElement from "./storyboardElement";

class SbEmptyElement extends StoryboardElement {
	constructor() {
		super({ path: "" });
	}

	toString(): string {
		return "";
	}
}

export default SbEmptyElement;
