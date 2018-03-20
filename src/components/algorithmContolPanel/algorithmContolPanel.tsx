import * as React from "react";
import {Component, CSSProperties} from "react";
import IconNext from 'material-ui/svg-icons/navigation/chevron-right';
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ToEndIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import StopIcon from 'material-ui/svg-icons/av/stop';
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {ViewStateStore} from "../../stores/viewStateStore";
import {computed} from "mobx";
import {autobind} from "core-decorators";
import FloatingActionButton from "material-ui/FloatingActionButton";
import COMPARISON from 'material-ui/svg-icons/image/remove-red-eye';
import PERMUTATION from 'material-ui/svg-icons/action/find-replace';
import {Row, Col} from "react-bootstrap";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";

export interface AlgorithmContolPanelProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore
}


const style = {
    marginRight: 20,
    alignSelf: 'center'
} as CSSProperties;

@inject('viewState')
@inject('algorithmChooser')
@observer
export class AlgorithmContolPanel extends Component<AlgorithmContolPanelProps, Readonly<{}>> {

    @computed
    get isAnimation(): boolean {
        let viewState = this.props.viewState;
        return !!viewState && viewState.animation
    }

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
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;

        if (algorithm && viewState) {
            return viewState.stepNumber !== (viewState.stepsCount - 1) && !this.isAnimation
        } else {
            return false
        }
    }

    @computed
    get canBack(): boolean {
        let viewState = this.props.viewState;
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;

        if (algorithm && viewState) {
            return viewState.stepNumber !== 0 && !this.isAnimation
        } else {
            return false
        }
    }

    @computed
    get canRefresh(): boolean {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;

        return !!algorithm && !this.isAnimation;
    }

    @autobind
    back() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.back();
        }
    }

    @autobind
    refresh() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.refresh();
        }
    }

    @autobind
    goAnimation() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.toEnd();
        }
    }

    @autobind
    stopAnimation() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.stopAnimation();
        }
    }

    render() {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        let permutationCount = currentStep && currentStep.permutationCount;
        let comparisonCount = currentStep && currentStep.comparisonCount;
        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <Row>
                    <Col xs={12} sm={12} lg={12} style={{display: "flex"}}>
                        <FloatingActionButton
                            disabled={!this.canRefresh}
                            onTouchStart={this.refresh}
                            onClick={this.refresh}
                            mini={true}
                            style={style}>
                            <RefreshIcon/>
                        </FloatingActionButton>
                        <FloatingActionButton
                            secondary={true}
                            onTouchStart={this.back}
                            onClick={this.back}
                            disabled={!this.canBack}
                            mini={true}
                            style={style}>
                            <IconBack/>
                        </FloatingActionButton>
                        <FloatingActionButton
                            disabled={!this.canNext}
                            mini={true}
                            style={style}
                            backgroundColor="#a4c639"
                            onClick={this.next}
                            onTouchStart={this.next}>
                            <IconNext/>
                        </FloatingActionButton>
                        {this.isAnimation ?
                            <FloatingActionButton
                                mini={true}
                                style={style}
                                onClick={this.stopAnimation}
                                onTouchStart={this.stopAnimation}>
                                <StopIcon/>
                            </FloatingActionButton> :
                            <FloatingActionButton
                                disabled={!this.canNext}
                                mini={true}
                                style={style}
                                onClick={this.goAnimation}
                                onTouchStart={this.goAnimation}>
                                <ToEndIcon/>
                            </FloatingActionButton>}
                        {currentStep ?
                            <span style={{display: 'inline-block'}}>
                                <Chip
                                    style={{
                                        margin: 4
                                    }}>
                                    <Avatar icon={<COMPARISON/>}/>
                                    {comparisonCount}
                                </Chip>
                                <Chip
                                    style={{
                                        margin: 4
                                    }}>
                                    <Avatar icon={<PERMUTATION/>}/>
                                    {permutationCount}
                                </Chip>
                            </span> : null}
                    </Col>
                </Row>
            </Paper>
        );
    }
}