import * as React from "react";
import {inject, observer} from "mobx-react";
import {ViewStateStore} from "../../stores/viewStateStore";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {autobind} from "core-decorators";

interface StepProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore
}

@inject('viewState')
@inject('algorithmChooser')
@observer
export class Step extends React.Component<StepProps, {}> {

    @autobind
    next() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.next();
        }
    }

    @autobind
    back() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.back();
        }
    }

    render() {
        let viewState = this.props.viewState;
        let stepNumber = viewState && viewState.stepNumber + 1;
        let currentStep = viewState && viewState.currentStep;
        let message = currentStep && currentStep.message;

        return (
            <div>
                <span>
                   Номер шага: {stepNumber} <br/> {message}
                </span>
                <br/>
                <button onClick={this.back}>
                    back
                </button>
                <button onClick={this.next}>
                    next
                </button>
            </div>
        )
    }
}