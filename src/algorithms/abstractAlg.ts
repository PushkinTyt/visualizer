import {AbstractView} from "./abstractView";
import {ViewStateStore} from "../stores/viewStateStore";
import {ArrayStateStore} from "../stores/arrayStateStore";

export abstract class AbstractAlg {
    static id: string;

    constructor(protected viewState: ViewStateStore, protected arrayStore: ArrayStateStore) {

    }

    // инициализация шагов алгоритма
    abstract init(): void;

    abstract getViews(): AbstractView[]
}