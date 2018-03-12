import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {computed} from "mobx";

export interface CodeListingProps {
    viewState?: ViewStateStore;
    algorithmChooser?: AlgorithmChooserStore;
}

@inject('viewState')
@inject('algorithmChooser')
@observer
export class CodeListing extends Component<CodeListingProps, undefined> {

    @computed
    get view() {
        let algorithmChooser = this.props.algorithmChooser;
        let view = algorithmChooser && algorithmChooser.view;
        return view || null
    }

    render() {
        let viewState = this.props.viewState;
        let algorithmChooser = this.props.algorithmChooser;

        let alogrithm = algorithmChooser && algorithmChooser.algorithm;
        let algorithmName = alogrithm && alogrithm.getAlgName();

        let currentStep = viewState && viewState.currentStep;
        let listingLineIdent = currentStep && currentStep.listingLineIdent;

        let ViewComponent = this.view && this.view.view;

        if (!ViewComponent) {
            return null
        }

        return (
            <div>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    <ViewComponent/>
                </Paper>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    Строчка листинга: {listingLineIdent}<br/>
                </Paper>
            </div>
        );
    }
}