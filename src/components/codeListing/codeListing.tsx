import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {computed} from "mobx";

export interface CodeListingProps {
    algorithmChooser?: AlgorithmChooserStore;
}

@inject('algorithmChooser')
@observer
export class CodeListing extends Component<CodeListingProps, Readonly<{}>> {

    @computed
    get view() {
        let algorithmChooser = this.props.algorithmChooser;
        let view = algorithmChooser && algorithmChooser.view;
        return view || null
    }

    render() {
        let ViewComponent = this.view && this.view.view;

        if (!ViewComponent) {
            return null
        }

        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <div style={{overflow: 'auto'}}>
                    <ViewComponent/>
                </div>
            </Paper>
        );
    }
}