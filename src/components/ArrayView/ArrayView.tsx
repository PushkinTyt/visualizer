import * as React from "react";
import {Component} from "react";
import {inject, observer} from "mobx-react";
import Chip from "material-ui/Chip";
import {computed} from "mobx";
import {ArrayElement} from "../../algorithms/arrayElement";
import {ViewStateStore} from "../../stores/viewStateStore";
import {ArrayStateStore} from "../../stores/arrayStateStore";

export interface ArrayViewProps {
    viewState?: ViewStateStore;
    arrayStore?: ArrayStateStore;
    inStep?:boolean
}

@inject('arrayStore')
@inject('viewState')
@observer
export class ArrayView extends Component<ArrayViewProps, undefined> {

    @computed
    get elements(): ArrayElement[] {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        let arrayStore = this.props.arrayStore;
        if (this.props.inStep) {
            return currentStep && currentStep.array || []
        } else {
            return arrayStore && arrayStore.elements || []
        }
    }

    chips() {
        return this.elements.map(element => {
            return (
                <Chip style={{
                    margin: 4,
                }}>
                    {element.value}
                </Chip>
            );
        })
    }

    render() {
        if (this.elements.length == 0) {
            return <div>Пустой массив</div>
        }

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {this.chips()}
            </div>
        );
    }
}