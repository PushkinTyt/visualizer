import {observable} from "mobx";
import {ArrayElementHighlight} from "./arrayElementHighlight";
import {ArrayElement} from "./arrayElement";

export class AlgorithmStep {

    @observable
    stepNumber: number | null = null;

    @observable
    listingLineIdent: string | null = null;

    @observable
    permutationCount: number | null = null;

    @observable
    comparisonCount: number | null = null;

    @observable
    message: string | null = null;

    @observable.ref
    array: ArrayElement[] = [];

    @observable
    highlightElements: ArrayElementHighlight[] = [];

    private constructor(message: string | null) {
        this.message = message;
    }

    public static create(message: string | null): AlgorithmStep {
        return new AlgorithmStep(message);
    }

    public static clone(step: AlgorithmStep): AlgorithmStep {
        let algorithmStep = new AlgorithmStep(step.message);
        algorithmStep.comparisonCount = step.comparisonCount;
        algorithmStep.permutationCount = step.permutationCount;
        algorithmStep.listingLineIdent = step.listingLineIdent;
        algorithmStep.highlightElements = step.highlightElements;
        algorithmStep.stepNumber = step.stepNumber;
        algorithmStep.array = ([] as ArrayElement[]).concat(step.array);
        return algorithmStep;
    }

    setListingLineIdent(value: string | null): AlgorithmStep {
        this.listingLineIdent = value;
        return this;
    }

    setPermutationCount(value: number): AlgorithmStep {
        this.permutationCount = value;
        return this;
    }

    setComparisonCount(value: number): AlgorithmStep {
        this.comparisonCount = value;
        return this;
    }

    setMessage(value: string): AlgorithmStep {
        this.message = value;
        return this;
    }

    setHighlightElements(value: ArrayElementHighlight[]): AlgorithmStep {
        this.highlightElements = value;
        return this;
    }

    setStepNumber(value: number): AlgorithmStep {
        this.stepNumber = value;
        return this;
    }

    setArray(array: ArrayElement[]) {
        this.array = ([] as ArrayElement[]).concat(array);
        return this;
    }
}