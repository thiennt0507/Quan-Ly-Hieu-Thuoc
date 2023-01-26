import { SpaceType } from "../../../../file/shared";
import { XmlComponent } from "../../../../file/xml-components";
interface ITextOptions {
    readonly space?: SpaceType;
    readonly text?: string;
}
export declare class Text extends XmlComponent {
    constructor(options: string | ITextOptions);
}
export {};
