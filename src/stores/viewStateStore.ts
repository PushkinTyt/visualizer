import {action, computed, observable, reaction} from "mobx";
import {AlgorithmStep} from "../algorithms/algorithmStep";

export class ViewStateStore {

    @observable
    stepId: string;

    @observable
    currentStep: AlgorithmStep = AlgorithmStep.create("Выберите алгоритм");

    @observable
    steps: AlgorithmStep[] = [];

    @computed
    get stepNumber() {
        return this.steps.indexOf(this.currentStep);
    }

    @computed
    get stepsCount() {
        return this.steps.length;
    }

    next(): AlgorithmStep {
        let nextIndex = this.steps.indexOf(this.currentStep) + 1;
        return this.currentStep = this.steps[nextIndex];
    }

    back() {
        let previousIndex = this.steps.indexOf(this.currentStep) - 1;
        return this.currentStep = this.steps[previousIndex];
    }

    refresh() {
        return this.currentStep = this.steps[0]
    }

    toEnd() {
        return this.currentStep = this.steps[this.stepsCount - 1]
    }
}

