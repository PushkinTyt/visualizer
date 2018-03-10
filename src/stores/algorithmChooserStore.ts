import {AbstractAlg} from "../algorithms/abstractAlg";
import {observable, ObservableMap} from "mobx";
import {ViewStateStore} from "./viewStateStore";
import {BubbleSort} from "../algorithms/impl/bubbleSort";
import {ArrayStore} from "./arrayStore";


export class AlgorithmChooserStore {

    @observable
    algorithm?: AbstractAlg;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private viewState: ViewStateStore, private arrayStore: ArrayStore) {
        let bubbleSort = new BubbleSort(viewState, arrayStore);
        this.algorithms.set(BubbleSort.id, bubbleSort);
        this.choose(bubbleSort)
    }

    choose(alg: AbstractAlg) {
        alg.init();
        this.algorithm = alg
    }
}