import * as React from "react";
import {Component} from "react";
import IconNext from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {ViewStateStore} from "../../stores/viewStateStore";
import {computed} from "mobx";
import {autobind} from "core-decorators";
import FloatingActionButton from "material-ui/FloatingActionButton";

export interface AlgorithmContolPanelProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore
}


const style = {
    marginRight: 20,
};

@inject('viewState')
@inject('algorithmChooser')
@observer
export class AlgorithmContolPanel extends Component<AlgorithmContolPanelProps, undefined> {

    @autobind
    next() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.next();
        }
    }


    @computed
    get canNext(): boolean {
        let viewState = this.props.viewState;
        if (viewState) {
            return viewState.stepNumber !== viewState.stepsCount
        } else {
            return false
        }
    }

    @computed
    get canBack(): boolean {
        let viewState = this.props.viewState;
        if (viewState) {
            return viewState.stepNumber !== 0
        } else {
            return false
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
        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <FloatingActionButton
                    secondary={true}
                    onTouchTap={this.back}
                    disabled={!this.canBack}
                    mini={true}
                    style={style}>
                    <IconBack/>
                </FloatingActionButton>
                <FloatingActionButton
                    disabled={!this.canNext}
                    mini={true}
                    backgroundColor="#a4c639"
                    onTouchTap={this.next}>
                    <IconNext/>
                </FloatingActionButton>
            </Paper>
        );
    }
}