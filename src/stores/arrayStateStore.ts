import {ArrayElement} from "../algorithms/arrayElement";
import {action, observable} from "mobx";
import {getUnicString} from "../utils/utils";
import {ISimpleTemplate, simplaeTemplates} from "../utils/templates";

export interface ArrayTemplate {
    elements: ArrayElement[]
    templateName: string
    ident: string
}

export class ArrayStateStore {

    static convertSimpleTemplates(templates: ISimpleTemplate[]): ArrayTemplate[] {
        return templates.map(template => {
            return {
                elements: template.elements.map(value => new ArrayElement(getUnicString(), value)),
                templateName: template.templateName,
                ident: getUnicString()
            }
        })
    }

    static clone(elements: ArrayElement[] = []): ArrayElement[] {
        return elements.map(element => new ArrayElement(getUnicString(), element.value))
    }

    @observable
    elements: ArrayElement[];

    @observable
    custom: boolean;

    @observable
    selectedTemplate: ArrayTemplate;

    templates: ArrayTemplate[] = [];

    constructor() {
        this.templates = ArrayStateStore.convertSimpleTemplates(simplaeTemplates);
        this.elements = ArrayStateStore.clone(this.templates[0].elements)
    }

    @action
    chooseTemplate(template: ArrayTemplate) {
        this.custom = false;
        this.selectedTemplate = template;
        this.setElements(template.elements, false);
    }

    @action
    setElements(elements: ArrayElement[], custom:boolean = true) {
        this.elements = ArrayStateStore.clone(elements);

        if (custom) {
            this.custom = custom;
            this.selectedTemplate = {
                elements: this.elements,
                ident: getUnicString(),
                templateName: 'custom'
            }
        }
    }
}