import {action, computed, observable, reaction} from "mobx";
import {AlgorithmStep} from "../algorithms/algorithmStep";

export class ViewStateStore {

    @observable
    currentStep: AlgorithmStep = ViewStateStore.getInitialStep();

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

    constructor() {
        window.onkeydown = window.onkeyup = window.onkeypress = ev => {
            if (ev.keyCode == 37 && this.stepNumber > 0)    {
                this.back();
            } else if (ev.keyCode == 39 && this.stepNumber < this.stepsCount - 1) {
                this.next();
            }
        };
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

    clear() {
        this.steps = [];
        this.currentStep = ViewStateStore.getInitialStep();
    }

    private static getInitialStep() {
        return AlgorithmStep.create("Выберите алгоритм сортировки");
    }
}

