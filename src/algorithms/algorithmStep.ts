import {observable} from "mobx";
import {ArrayElement} from "./arrayElement";

export enum Operations {
    FORWARD,
    BACK
}

export class AlgorithmStep {

    @observable
    listingLineIdent: string;

    @observable
    permutationCount: number;

    @observable
    comparisonCount: number;

    @observable
    operations: Operations[] = [Operations.BACK, Operations.FORWARD];

    @observable
    message: string;

    @observable
    highlightElements: ArrayElement[] = [];

    constructor(message: string) {
        this.message = message;
    }

    isFacingEnd() {
        this.operations = [Operations.BACK]
    }

    isFacingStart() {
        this.operations = [Operations.FORWARD]
    }
}