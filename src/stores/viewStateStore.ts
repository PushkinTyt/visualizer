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

    next(): AlgorithmStep {
        let nextIndex = this.steps.indexOf(this.currentStep) + 1;
        return this.currentStep = this.steps[nextIndex];
    }

    back() {
        let previousIndex = this.steps.indexOf(this.currentStep) - 1;
        return this.currentStep = this.steps[previousIndex];
    }
}

