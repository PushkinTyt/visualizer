import {AbstractView} from "./abstractView";
import {ArrayState} from "../stores/arrayState";
import {ViewState} from "../stores/viewState";


export abstract class AbstractAlg {
    static id:string;

    abstract step():void;

    abstract init():void;

    abstract getViews(): AbstractView[]

    constructor(protected arrayState: ArrayState, protected viewState:ViewState) {

    }
}