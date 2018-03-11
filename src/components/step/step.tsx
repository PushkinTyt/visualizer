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
        let currentStep = viewState && viewState.currentStep;
        let message = currentStep && currentStep.message;
        let listingLineIdent = currentStep && currentStep.listingLineIdent;
        let permutationCount = currentStep && currentStep.permutationCount;
        let comparisonCount = currentStep && currentStep.comparisonCount;
        let stepNumber = currentStep != undefined && currentStep.stepNumber != undefined
            && currentStep.stepNumber + 1;

        return (
            <div>
                <span>
                   Номер шага: {stepNumber} <br/>
                    Строчка листинга: {listingLineIdent}<br/>
                    Сравнений {comparisonCount} <br/>
                    Перестановок {permutationCount}<br/> <br/>
                    {message}
                </span>
                <br/>
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