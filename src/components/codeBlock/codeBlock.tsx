import * as React from "react";
import {Component} from "react";
import {ViewStateStore} from "../../stores/viewStateStore";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import {Brace} from "../brace/brace";

export interface CodeBlockProps {
    viewState?: ViewStateStore;
    ident?: string
    text: string
    brace?:boolean
}

@inject('viewState')
@observer
export class CodeBlock extends Component<CodeBlockProps, Readonly<{}>> {

    @computed
    get currentBlockIdent(): string {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        return currentStep && currentStep.listingLineIdent || ''
    }


    render() {
        let body;
        if (this.props.brace) {
            body = <Brace>
                {this.props.children}
            </Brace>
        } else {
            body = <div style={{marginLeft:10}}>
                {this.props.children}
            </div>
        }
        return (
            <div>
                <div style={{color:this.currentBlockIdent === this.props.ident ? '#ff4081': undefined}}>
                    {this.props.text}
                </div>
                {body}
            </div>
        );
    }
}