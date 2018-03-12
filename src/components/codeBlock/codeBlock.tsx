import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {computed} from "mobx";

export interface CodeBlockProps {
    viewState?: ViewStateStore;
    ident: string
    text: string
}

@inject('viewState')
@observer
export class CodeBlock extends Component<CodeBlockProps, undefined> {

    @computed
    get currentBlockIdent(): string {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        return currentStep && currentStep.listingLineIdent || ''
    }


    render() {
        return (
            <div>
                <div>
                    {this.currentBlockIdent === this.props.ident ? '*' : null}
                    {this.props.text}
                </div>
                <div style={{marginLeft:10}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}