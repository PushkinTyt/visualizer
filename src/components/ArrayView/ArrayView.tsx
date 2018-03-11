import * as React from "react";
import {Component} from "react";
import {inject, observer} from "mobx-react";
import Chip from "material-ui/Chip";
import {computed} from "mobx";
import {ArrayElement} from "../../algorithms/arrayElement";
import {ViewStateStore} from "../../stores/viewStateStore";

export interface ArrayViewProps {
    viewState?: ViewStateStore;
}

@inject('viewState')
@observer
export class ArrayView extends Component<ArrayViewProps, undefined> {

    @computed
    get elements(): ArrayElement[] {
        let viewState = this.props.viewState;
        let currentStep = viewState && viewState.currentStep;
        return currentStep && currentStep.array || []
    }

    chips() {
        return this.elements.map(element => {
            return (
                <Chip style={{
                    margin: 4,
                }} key={element.id}>
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