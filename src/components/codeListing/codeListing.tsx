import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";

export interface CodeListingProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore;
}

@inject('viewState')
@inject('algorithmChooser')
@observer
export class CodeListing extends Component<CodeListingProps, undefined> {

    render() {
        let viewState = this.props.viewState;
        let algorithmChooser = this.props.algorithmChooser;

        let alogrithm = algorithmChooser && algorithmChooser.algorithm;
        let algorithmName = alogrithm && alogrithm.getAlgName();

        let currentStep = viewState && viewState.currentStep;
        let listingLineIdent = currentStep && currentStep.listingLineIdent;

        return (
            <div>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    Строчка листинга: {listingLineIdent}<br/>
                </Paper>
            </div>
        );
    }
}