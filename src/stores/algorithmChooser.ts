import {AbstractAlg} from "../algirithms/abstractAlg";
import {observable, ObservableMap} from "mobx";
import {ViewState} from "./viewState";
import {BabbleALG} from "../algirithms/babble/babbleALG";


export class AlgorithmChooser {

    @observable
    algorithm?: AbstractAlg;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private viewState: ViewState) {
        let babbleALG = new BabbleALG(viewState);
        this.algorithms.set(BabbleALG.id, babbleALG)
        this.choose(babbleALG)
    }

    choose(alg: AbstractAlg) {
        alg.init();
        this.algorithm = alg
    }
}