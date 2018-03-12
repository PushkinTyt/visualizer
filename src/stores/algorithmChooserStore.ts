import {AbstractAlg} from "../algorithms/abstractAlg";
import {observable, ObservableMap} from "mobx";
import {ViewStateStore} from "./viewStateStore";
import {BubbleSortAlg} from "../algorithms/impl/bubbleSortAlg";
import {ArrayStateStore} from "./arrayStateStore";
import {InsertSortAlg} from "../algorithms/impl/insertSortAlg";

export class AlgorithmChooserStore {

    @observable
    algorithm?: AbstractAlg;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private viewState: ViewStateStore, private arrayStore: ArrayStateStore) {
        this.algorithms.set(BubbleSortAlg.id, new BubbleSortAlg(viewState, arrayStore));
        this.algorithms.set(InsertSortAlg.id, new InsertSortAlg(viewState, arrayStore));
        this.choose(this.algorithms.values()[0]);
    }

    choose(alg: AbstractAlg) {
        alg.init();
        this.algorithm = alg
    }
}