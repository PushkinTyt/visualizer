import {AbstractAlg} from "../abstractAlg";
import {AbstractView} from "../abstractView";


export class BabbleALG extends AbstractAlg {
    stepBack(): void {
    }

    static id = 'BabbleALG';

    init(): void {
    }

    stepForward(): void {
        this.viewState.currtentAlgorithmState.stepNumber++
    }

    getViews(): AbstractView[] {
        return [];
    }

}