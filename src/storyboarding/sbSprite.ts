import { ESbElementProperty, ESbElementType } from "../types/enums";
import { TStoryboardElementData, TStoryboardElementPropertyGroupMap, TUnstrictStoryboardElementData } from "../types/types";
import { ValueUnion } from "../types/utils";
import StoryboardElement from "./storyboardElement";

class SbSprite extends StoryboardElement {
	constructor({ path, layer, origin, defaultPosition }: TUnstrictStoryboardElementData) {
		super({ path, layer, origin, defaultPosition });
	}

	getTitle(data: TStoryboardElementData): string {
		const { layer, origin, path, defaultPosition } = data;

		return [ESbElementType.Sprite, layer, origin, `"${path}"`, defaultPosition.toString()].join(",");
	}

	toString(): string {
		const title = this.getTitle(this.getData());
		const properties = this.getProperties();
		const propertiesString = properties
			? properties.map((property) => {
					const title = ` ${property.toString()}`;
					if ([ESbElementProperty.L, ESbElementProperty.T].includes(property.type)) {
						const groupProperties = (property.data as ValueUnion<TStoryboardElementPropertyGroupMap>)?.properties;
						const groupPropertiesString = groupProperties
							? groupProperties.map((property) => `  ${property.toString()}`).join("\n")
							: "";
						return [title, groupPropertiesString].filter(Boolean).join("\n");
					}
					return title;
				})
			: [];

		return [title, ...propertiesString].join("\n");
	}
}

export default SbSprite;
