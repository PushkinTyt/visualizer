import {observable} from "mobx";

export enum Operations {
    FORWARD,
    BACK
}

export class AlgorithmState {
    @observable
    stepNumber: number = 0;

    @observable
    permutationCount: number;

    @observable
    comparisonCount: number;

    @observable
    operations: Operations[] = [];

}