import {AbstractView} from "./abstractView";
import {ViewState} from "../stores/viewState";

export abstract class AbstractAlg {
    static id: string;

    abstract stepForward(): void;

    abstract stepBack(): void;

    // сброс в ноль состояние
    abstract init(): void;

    abstract getViews(): AbstractView[]

    constructor(protected viewState: ViewState) {

    }
}