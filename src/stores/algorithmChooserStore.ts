import {AbstractAlg} from "../algorithms/abstractAlg";
import {observable, ObservableMap} from "mobx";
import {ViewStateStore} from "./viewStateStore";
import {BubbleSortAlg} from "../algorithms/impl/bubbleSortAlg";
import {ArrayStateStore} from "./arrayStateStore";


export class AlgorithmChooserStore {

    @observable
    algorithm?: AbstractAlg;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private viewState: ViewStateStore, private arrayStore: ArrayStateStore) {
        let bubbleSort = new BubbleSortAlg(viewState, arrayStore);
        this.algorithms.set(BubbleSortAlg.id, bubbleSort);
        this.choose(bubbleSort)
    }

    choose(alg: AbstractAlg) {
        alg.init();
        this.algorithm = alg
    }
}