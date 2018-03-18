import {action, computed, observable, reaction} from "mobx";
import {AlgorithmStep} from "../algorithms/algorithmStep";
import {autobind} from "core-decorators";


export class ViewStateStore {

    @observable
    stepId: string;

    @observable
    animation: boolean = false;

    @observable
    currentStep: AlgorithmStep = AlgorithmStep.create("Выберите алгоритм");

    @observable
    steps: AlgorithmStep[] = [];

    @observable
    animationStep: number = 10;

    @computed
    get stepNumber() {
        return this.steps.indexOf(this.currentStep);
    }

    @computed
    get stepsCount() {
        return this.steps.length;
    }

    @autobind
    next(): AlgorithmStep {
        let algorithmSteps = this.steps;
        let nextIndex = algorithmSteps.indexOf(this.currentStep) + 1;
        return this.currentStep = algorithmSteps[nextIndex];
    }

    back() {
        let previousIndex = this.steps.indexOf(this.currentStep) - 1;
        if (previousIndex < 0) {
            previousIndex = 0
        }
        return this.currentStep = this.steps[previousIndex];
    }

    refresh() {
        return this.currentStep = this.steps[0]
    }

    delayIdent:any;

    toEnd():void {
        this.animation = true;
        this.delayIdent = setInterval(() => {
            if (this.stepNumber < this.stepsCount - 1) {
                this.next()
            } else {
                this.stopAnimation()
            }
        }, this.animationStep)
    }

    stopAnimation() {
        clearInterval(this.delayIdent);
        this.animation = false;
    }
}

