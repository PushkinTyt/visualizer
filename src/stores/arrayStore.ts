import {ArrayElement} from "../algorithms/ArrayElement";
import {observable} from "mobx";

export class ArrayStore {

    @observable
    elements: ArrayElement[];

    constructor() {
        this.elements = [1, 2, 3, 4, 10, 6, 7, 8, 9, 5].map(value => new ArrayElement(value.toString(), value))
    }
}