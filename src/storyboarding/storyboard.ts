import { ESbElementProperty, ESbElementType, ESbLayer } from "../types/enums";
import { TSbLayerData, TSbLayersBuilder } from "../types/types";
import { parseElementGroupProperty, parseElementProperty, parseElementTitle } from "../utils/parsers";
import SbEmptyElement from "./sbEmptyElement";
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

    constructor(osb?: string) {
        if(!osb) return;

        this.parse(osb, false);
    }

    addElement(element: StoryboardElement): Storyboard {
        this.#elements.push(element);
        this.#layers[element.getData().layer].elements.push(element);
        return this;
    }

    parse(osb: string, createNew: boolean = true): Storyboard | undefined {
        const sb = new Storyboard();

        let currentPropertyType: ESbElementProperty | null =  null;
        let currentPropertyTrimmedLine: string | null =  null;
        let currentGroupElement = new SbEmptyElement();
        let currentElement: StoryboardElement | null = null;
        
        const lines = osb.split("\n");

        lines.forEach((line, index) => {
            if(line.startsWith("//") || line.startsWith("[")) return;

            const isElementTitle = line.startsWith(ESbElementType.Sprite) || line.startsWith(ESbElementType.Animation) || line.startsWith(ESbElementType.Sample);

            if(isElementTitle) 
            {
                currentElement = null;
            }

            const isElementProperty = line.startsWith(" ");
            const isElementPropertyGroup = line.startsWith("  ");

            if(currentElement) {
                const trimmedLine = line.trim();
                const type = trimmedLine.substring(0, trimmedLine[1] !== "," ? 2 : 1) as ESbElementProperty;

                if(isElementProperty && !isElementPropertyGroup) {
                    currentPropertyType = type;
                    currentPropertyTrimmedLine = trimmedLine;
                    parseElementProperty(trimmedLine, type, currentElement);
                } else if(isElementPropertyGroup) {
                    const isLastElementPropertyGroup = (typeof lines[index + 1] === "string" && !lines[index + 1].startsWith("  ") || !lines[index + 1]);

                    parseElementProperty(trimmedLine, type, currentGroupElement);
                    if(isLastElementPropertyGroup && currentPropertyType && currentPropertyTrimmedLine) {
                        parseElementGroupProperty(currentPropertyTrimmedLine, currentPropertyType, currentElement, currentGroupElement);
                        currentGroupElement = new SbEmptyElement();
                    };
                }
            }

            parseElementTitle(line, ESbElementType.Sprite, (element) => {
                currentElement = element;
            });
            parseElementTitle(line, ESbElementType.Animation, (element) => {
                currentElement = element;
            });
            parseElementTitle(line, ESbElementType.Sample, (element) => {
                currentElement = element;
            });

            if(currentElement && isElementTitle) {
                if(!createNew) this.addElement(currentElement);
                else sb.addElement(currentElement);
            }
        });

        if(createNew) return sb;
    }

    getElements(): StoryboardElement[] {
        return this.#elements;
    }

    getElement(index: number): StoryboardElement | null {
        return this.#elements[index];
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