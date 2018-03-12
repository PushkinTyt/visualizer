import * as React from "react";
import {Component} from "react";
import {inject, observer} from "mobx-react";
import Chip from "material-ui/Chip";
import {computed} from "mobx";
import {ArrayElement} from "../../algorithms/arrayElement";
import {ViewStateStore} from "../../stores/viewStateStore";
import {ArrayStateStore} from "../../stores/arrayStateStore";
import Avatar from "material-ui/Avatar";
import COMPARISON from 'material-ui/svg-icons/image/remove-red-eye';
import SELECT from 'material-ui/svg-icons/action/search';
import PERMUTATION from 'material-ui/svg-icons/action/find-replace';
import {HighLightType} from "../../algorithms/arrayElementHighlight";

export interface ArrayViewProps {
    viewState?: ViewStateStore;
    arrayStore?: ArrayStateStore;
    inStep?: boolean
}

let stepIconMap = {
    [HighLightType.COMPARISON]: COMPARISON,
    [HighLightType.SELECT]: SELECT,
    [HighLightType.PERMUTATION]: PERMUTATION,
};

interface elemIconMap {
    [ident: string]: JSX.Element
}

@inject('arrayStore')
@inject('viewState')
@observer
export class ArrayView extends Component<ArrayViewProps, undefined> {

    @computed
    get step() {
        let viewState = this.props.viewState;
        return viewState && viewState.currentStep || null;
    }

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

    @computed
    get avatarMap(): elemIconMap {
        let res: elemIconMap = {};
        if (this.step) {
            this.step.highlightElements.forEach(hElement => {
                let id = hElement.element.id;
                let type = hElement.type;
                res[id] = stepIconMap[type] as any
            })
        }

        return res;
    }

    cheepAvatar(element: ArrayElement) {
        if (this.step) {
            const AvatarIcon = this.avatarMap[element.id] as any;
            if (AvatarIcon) {
                return <Avatar icon={<AvatarIcon/>}/>
            }

            return null
        }

        return null
    }

    chips() {
        return this.elements.map(element => {
            return (
                <Chip
                    style={{
                        margin: 4,
                    }}
                    key={element.id}>
                    {this.cheepAvatar(element)}
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