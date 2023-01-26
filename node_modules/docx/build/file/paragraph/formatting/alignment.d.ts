import { XmlAttributeComponent, XmlComponent } from "../../../file/xml-components";
export declare enum AlignmentType {
    START = "start",
    CENTER = "center",
    END = "end",
    BOTH = "both",
    MEDIUM_KASHIDA = "mediumKashida",
    DISTRIBUTE = "distribute",
    NUM_TAB = "numTab",
    HIGH_KASHIDA = "highKashida",
    LOW_KASHIDA = "lowKashida",
    THAI_DISTRIBUTE = "thaiDistribute",
    LEFT = "left",
    RIGHT = "right",
    JUSTIFIED = "both"
}
export declare class AlignmentAttributes extends XmlAttributeComponent<{
    readonly val: AlignmentType;
}> {
    protected readonly xmlKeys: {
        val: string;
    };
}
export declare class Alignment extends XmlComponent {
    constructor(type: AlignmentType);
}
