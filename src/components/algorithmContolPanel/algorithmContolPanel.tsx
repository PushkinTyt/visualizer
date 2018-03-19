import * as React from "react";
import {Component} from "react";
import IconNext from 'material-ui/svg-icons/navigation/chevron-right';
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ToEndIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {ViewStateStore} from "../../stores/viewStateStore";
import {computed} from "mobx";
import {autobind} from "core-decorators";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Badge from "material-ui/Badge";
import {Row, Col} from "react-bootstrap";

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
export class AlgorithmContolPanel extends Component<AlgorithmContolPanelProps, Readonly<{}>> {

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
            return viewState.stepNumber !== (viewState.stepsCount - 1)
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
            return viewState.stepNumber !== 0
        } else {
            return false
        }
    }

    @computed
    get canRefresh(): boolean {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;

        return !!algorithm;
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
    toEnd() {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.toEnd();
        }
    }

    render() {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        let permutationCount = currentStep && currentStep.permutationCount;
        let comparisonCount = currentStep && currentStep.comparisonCount;
        let stepNumber = currentStep != undefined && currentStep.stepNumber != undefined && currentStep.stepNumber;
        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <Row>
                    <Col xs={12} sm={12} lg={6}>
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
                        <FloatingActionButton
                            disabled={!this.canNext}
                            mini={true}
                            onClick={this.toEnd}
                            onTouchStart={this.toEnd}>
                            <ToEndIcon/>
                        </FloatingActionButton>
                    </Col>
                    <Col xs={12} sm={12} lg={6}>
                        <Badge
                            badgeContent={stepNumber}
                            primary={true}>
                            <span>Номер шага</span>
                        </Badge>
                        <div>
                            Номер шага: {stepNumber} <br/>
                            Сравнений: {comparisonCount} <br/>
                            Перестановок: {permutationCount}<br/>
                        </div>
                    </Col>
                </Row>
            </Paper>
        );
    }
}