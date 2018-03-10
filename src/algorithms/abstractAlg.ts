import {AbstractView} from "./abstractView";
import {ViewStateStore} from "../stores/viewStateStore";
import {ArrayStore} from "../stores/arrayStore";

export abstract class AbstractAlg {
    static id: string;

    constructor(protected viewState: ViewStateStore, protected arrayStore: ArrayStore) {

    }

    // инициализация шагов алгоритма
    abstract init(): void;

    abstract getViews(): AbstractView[]
}