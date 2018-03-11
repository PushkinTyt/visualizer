import {AbstractView} from "./abstractView";
import {ViewStateStore} from "../stores/viewStateStore";
import {ArrayStateStore} from "../stores/arrayStateStore";
import {AlgorithmStep} from "./algorithmStep";
import {ArrayElement} from "./arrayElement";

export abstract class AbstractAlg {
    static id: string;

    constructor(protected viewState: ViewStateStore, protected arrayStore: ArrayStateStore) {

    }

    // инициализация шагов алгоритма
    abstract init(): void;

    abstract getViews(): AbstractView[];

    abstract getAlgName(): string ;

    protected getSteps(): AlgorithmStep[] {
        return this.viewState.steps;
    }

    protected clearSteps(): void {
        this.viewState.steps = [];
    }

    protected addStep(step: AlgorithmStep) {
        this.viewState.steps.push(step);
    }

    protected lastStep(): AlgorithmStep {
        let steps = this.getSteps();
        return steps[steps.length - 1];
    }
}