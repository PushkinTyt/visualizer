import {observable} from "mobx";
import {ArrayElement} from "./arrayElement";
import {ArrayElementHighlight} from "./arrayElementHighlight";

export class AlgorithmStep {

    @observable
    listingLineIdent: string;

    @observable
    permutationCount: number = 0;

    @observable
    comparisonCount: number = 0;

    @observable
    message: string;

    @observable
    highlightElements: ArrayElementHighlight[] = [];

    private constructor(message: string) {
        this.message = message;
    }

    public static create(message: string): AlgorithmStep {
        return new AlgorithmStep(message);
    }

    public static clone(step: AlgorithmStep): AlgorithmStep {
        let algorithmStep = new AlgorithmStep(step.message);
        algorithmStep.comparisonCount = step.comparisonCount;
        algorithmStep.permutationCount = step.permutationCount;
        algorithmStep.listingLineIdent = step.listingLineIdent;
        algorithmStep.highlightElements = step.highlightElements;
        return algorithmStep;
    }

    setListingLineIdent(value: string): AlgorithmStep {
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
}