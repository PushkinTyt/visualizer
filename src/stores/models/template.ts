import {ISimpleTemplate} from "../../utils/templates";
import {ArrayElement} from "../../algorithms/arrayElement";
import {getUnicString} from "../../utils/utils";

export class Template {

    elements: ArrayElement[];

    templateName: string;

    ident: string = getUnicString();

    constructor(simpleTemplate: ISimpleTemplate) {
        this.templateName = simpleTemplate.templateName;
        this.elements = this.clone(simpleTemplate.elements.map(value => new ArrayElement(getUnicString(), parseInt(value.toString()))))
    }

    clone(elements: ArrayElement[] = []): ArrayElement[] {
        return elements.map(element => new ArrayElement(getUnicString(), element.value))
    }
}