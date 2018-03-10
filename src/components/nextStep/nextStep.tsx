import * as React from "react";
import {inject, observer} from "mobx-react";
import {ViewState} from "../../stores/viewState";
import {AlgorithmChooser} from "../../stores/algorithmChooser";
import {autobind} from "core-decorators";

interface NextStepProps {
    viewState?: ViewState;
    algorithmChooser?: AlgorithmChooser
}

@inject('viewState')
@inject('algorithmChooser')
@observer
export class NextStep extends React.Component<NextStepProps, {}> {

    @autobind
    next() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;
        if (algorithm) {
            algorithm.stepForward()
        }
    }

    render() {
        let viewState = this.props.viewState;
        let stepNumber = viewState && viewState.currtentAlgorithmState.stepNumber;
        return (
            <div>
                <span>
                    {stepNumber}
                </span>
                <button onClick={this.next}>
                    next
                </button>
            </div>
        )
    }
}