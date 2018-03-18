import {AbstractAlg} from "../algorithms/abstractAlg";
import {computed, observable, ObservableMap} from "mobx";
import {ViewStateStore} from "./viewStateStore";
import {BubbleSortAlg} from "../algorithms/impl/bubbleSortAlg";
import {ArrayStateStore} from "./arrayStateStore";
import {InsertSortAlg} from "../algorithms/impl/insertSortAlg";

export class AlgorithmChooserStore {

    @observable
    algorithm?: AbstractAlg;

    @observable
    viewId?: string | null = null;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private viewState: ViewStateStore, private arrayStore: ArrayStateStore) {
        this.algorithms.set(BubbleSortAlg.id, new BubbleSortAlg(viewState, arrayStore));
        this.algorithms.set(InsertSortAlg.id, new InsertSortAlg(viewState, arrayStore));
    }

    choose(alg: AbstractAlg) {
        if (alg) {
            alg.init();
        } else {
            this.viewState.clear();
        }

        this.algorithm = alg;
    }

    @computed
    get view(): any {
        if (this.viewId && this.algorithm) {
            return this.algorithm.getViews().filter(v => v.id === this.viewId)[0]
        }
        else null
    }
}