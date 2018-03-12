import {ArrayElement} from "../algorithms/arrayElement";
import {action, computed, observable} from "mobx";
import {getUnicString} from "../utils/utils";
import {simplaeTemplates} from "../utils/templates";
import {CustomTemplate} from "./models/customTemplate";
import {Template} from "./models/template";

export interface ArrayTemplate {
    elements: ArrayElement[]
    templateName: string
    ident: string
}

export class ArrayStateStore {

    static cloneElements(elements: ArrayElement[] = []): ArrayElement[] {
        return elements.map(element => new ArrayElement(getUnicString(), element.value))
    }

    @observable.ref
    elements: ArrayElement[];

    @observable
    selectedTemplateIdent: string;

    templates: ArrayTemplate[] = [];

    private customTemplate: CustomTemplate = new CustomTemplate()

    constructor() {
        this.templates = simplaeTemplates.map(simTemp => new Template(simTemp));
        this.templates.push(this.customTemplate);
        this.chooseTemplate(this.templates[0].ident);
    }

    getCloneElements(): ArrayElement[] {
        return ([] as ArrayElement[]).concat(this.elements)
    }

    @computed
    get selectedTemplate() {
        let templates = this.templates.filter(template => template.ident === this.selectedTemplateIdent);
        return templates[0]
    }

    @computed
    get isCustom(): boolean {
        return this.selectedTemplate instanceof CustomTemplate
    }

    @action
    chooseTemplate(templateIdent: string) {
        this.selectedTemplateIdent = templateIdent;
        this.elements = ArrayStateStore.cloneElements(this.selectedTemplate.elements);
    }

    @action
    setElements(elements: ArrayElement[]) {
        this.elements = ArrayStateStore.cloneElements(elements);
        this.selectedTemplateIdent = this.customTemplate.ident
    }

    @action
    add(element: ArrayElement, index: number) {
        this.elements.splice(index, 0, element);
        this.elements = this.getCloneElements();
    }

    @action
    delete(element: ArrayElement) {
        let index = this.elements.indexOf(element);
        if (~index) {
            this.elements.splice(index, 1);
            this.elements = this.getCloneElements();
        }
    }

    @action
    addBefore(element: ArrayElement, element2: ArrayElement) {
        let index = this.elements.indexOf(element);
        index = index <= 0 ? 0 : index - 1;
        this.elements.splice(index, 0, element2);
        this.elements = this.getCloneElements();
    }

    @action
    addAfter(element: ArrayElement, element2: ArrayElement) {
        let index = this.elements.indexOf(element) + 1;
        this.elements.splice(index, 0, element2);
        this.elements = this.getCloneElements();
    }

    @action
    swapAfter(element: ArrayElement) {
        let index = this.elements.indexOf(element);
        let element2 = this.elements[index + 1]
        this.elements.splice(index, 2, element2, element);
        this.elements = this.getCloneElements();
    }
}