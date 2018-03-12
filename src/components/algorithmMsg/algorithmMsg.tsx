import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";

export interface AlgorithmMsgProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore;
}

@inject('viewState')
@inject('algorithmChooser')
@observer
export class AlgorithmMsg extends Component<AlgorithmMsgProps, undefined> {

    render() {
        let viewState = this.props.viewState;
        let algorithmChooser = this.props.algorithmChooser;

        let alogrithm = algorithmChooser && algorithmChooser.algorithm;
        let algorithmName = alogrithm && alogrithm.getAlgName();

        let currentStep = viewState && viewState.currentStep;
        let message = currentStep && currentStep.message;
        let listingLineIdent = currentStep && currentStep.listingLineIdent;
        let permutationCount = currentStep && currentStep.permutationCount;
        let comparisonCount = currentStep && currentStep.comparisonCount;
        let stepNumber = currentStep != undefined && currentStep.stepNumber != undefined
            && currentStep.stepNumber + 1;

        return (
            <div>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    Номер шага: {stepNumber} <br/>
                    Сравнений {comparisonCount} <br/>
                    Перестановок {permutationCount}<br/> <br/>
                    {message}
                </Paper>
            </div>
        );
    }
}