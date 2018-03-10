import * as React from "react";
import {Provider} from "mobx-react";
import {AlgorithmChooser} from "./algorithmChooser";
import {ArrayState} from "./arrayState";
import {ViewState} from "./viewState";

export interface MainStoreProviderStores {
    algorithmChooser: AlgorithmChooser;
    arrayState: ArrayState;
    viewState: ViewState;
}

export class MainStoreProvaider extends React.Component<undefined, undefined> {

    stores: MainStoreProviderStores

    componentWillMount() {
        const arrayState = new ArrayState();
        const viewState = new ViewState();
        this.stores = {
            algorithmChooser: new AlgorithmChooser(arrayState, viewState),
            arrayState,
            viewState
        }
    }

    render(): JSX.Element | null {
        return (
            <Provider {...this.stores}>
                {this.props.children}
            </Provider>
        )
    }
}