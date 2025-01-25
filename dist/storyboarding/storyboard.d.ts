import { ESbLayer } from "../types/enums";
import { TSbLayersBuilder } from "../types/types";
import StoryboardElement from "./storyboardElement";
type TLayers = TSbLayersBuilder<ESbLayer, StoryboardElement>;
declare class Storyboard {
    #private;
    constructor();
    addElement(element: StoryboardElement): Storyboard;
    getElements(): StoryboardElement[];
    getLayers(): TLayers;
    toString(): string;
}
export default Storyboard;
//# sourceMappingURL=storyboard.d.ts.map