import {observable} from "mobx";
import {AlgorithmState} from "../algirithms/AlgorithmState";
import {ArrayElement} from "../algirithms/ArrayElement";

export class ViewState {
    @observable
    stepId:string;

    currtentAlgorithmState: AlgorithmState = new AlgorithmState();

    arrayView: ArrayElement[]
}