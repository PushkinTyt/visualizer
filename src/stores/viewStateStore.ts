import {action, computed, observable, reaction} from "mobx";
import {AlgorithmStep} from "../algorithms/algorithmStep";
import {autobind} from "core-decorators";


export class ViewStateStore {

    @observable
    currentStep: AlgorithmStep = ViewStateStore.getInitialStep();

    @observable
    animation: boolean = false;

    @observable
    steps: AlgorithmStep[] = [];

    @observable
    animationStep: number = 100;

    @computed
    get stepNumber() {
        return this.steps.indexOf(this.currentStep);
    }

    @computed
    get stepsCount() {
        return this.steps.length;
    }

    constructor() {
        window.onkeydown = ev => {
            if (ev.keyCode == 37 && this.stepNumber > 0)    {
                this.back();
            } else if (ev.keyCode == 39 && this.stepNumber < this.stepsCount - 1) {
                this.next();
            }
        };
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
        if (this.animationStep) {
            this.animationStepNext()
        } else {
            this.currentStep = this.steps[this.stepsCount - 1]
        }
    }

    private animationStepNext() {
        this.delayIdent = setTimeout(() => {
            if (this.animation && this.stepNumber < this.stepsCount - 1) {
                this.next();
                this.animationStepNext();
            } else {
                this.stopAnimation();
            }
        }, this.animationStep)
    }

    stopAnimation() {
        clearInterval(this.delayIdent);
        this.animation = false;
    }

    clear() {
        this.steps = [];
        this.currentStep = ViewStateStore.getInitialStep();
    }

    private static getInitialStep() {
        return AlgorithmStep.create("Выберите алгоритм сортировки");
    }
}

