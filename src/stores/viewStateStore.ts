import {action, computed, observable, reaction} from "mobx";
import {AlgorithmStep} from "../algorithms/AlgorithmStep";

export class ViewStateStore {

    @observable
    stepId: string;

    @observable
    currentStep: AlgorithmStep = new AlgorithmStep("Выберите алгоритм");

    @observable
    steps: AlgorithmStep[] = [];

    @computed
    get stepNumber() {
        return this.steps.indexOf(this.currentStep);
    }

    @action
    next(): AlgorithmStep {
        let nextIndex = this.steps.indexOf(this.currentStep) + 1;
        return this.currentStep = this.steps[nextIndex];
    }
}

