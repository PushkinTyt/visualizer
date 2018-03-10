import {AbstractAlg} from "../algirithms/abstractAlg";
import {observable, ObservableMap} from "mobx";
import {ArrayState} from "./arrayState";
import {ViewState} from "./viewState";
import {BabbleALG} from "../algirithms/babble/babbleALG";


export class AlgorithmChooser {

    @observable
    algorithm?: AbstractAlg;

    algorithms: ObservableMap<AbstractAlg> = new ObservableMap<AbstractAlg>();

    constructor(private arrayState: ArrayState, private viewState: ViewState) {
        this.algorithms.set(BabbleALG.id, new BabbleALG(arrayState, viewState))
    }

    choose(alg: AbstractAlg) {
        alg.init();
        this.algorithm = alg
    }
}