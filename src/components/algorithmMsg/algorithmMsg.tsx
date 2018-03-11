import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";

export interface AlgorithmMsgProps {
    viewState?: ViewStateStore;
}

@inject('viewState')
@observer
export class AlgorithmMsg extends Component<AlgorithmMsgProps, undefined> {

    render() {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        let message = currentStep && currentStep.message;
        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                {message}
            </Paper>
        );
    }
}