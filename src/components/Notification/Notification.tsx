import * as React from "react";
import {Component} from "react";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {ArrayStateStore} from "../../stores/arrayStateStore";
import {ViewStateStore} from "../../stores/viewStateStore";

export interface NotificationProps {
    algorithmChooser?: AlgorithmChooserStore
    viewState?: ViewStateStore;
    arrayStore?: ArrayStateStore;
}

@inject('algorithmChooser')
@observer
export class Notification extends Component<NotificationProps, undefined> {


    componentWillMount() {

    }


    render() {
        let algorithmChooser = this.props.algorithmChooser;
        let viewId = algorithmChooser && algorithmChooser.viewId;

        return (
            <div></div>
        );
    }
}