import * as React from "react";
import {Provider} from "mobx-react";
import {AlgorithmChooser} from "./algorithmChooser";
import {ViewState} from "./viewState";

export interface MainStoreProviderStores {
    algorithmChooser: AlgorithmChooser;
    viewState: ViewState;
}

export class MainStoreProvaider extends React.Component<{}, undefined> {

    stores: MainStoreProviderStores

    componentWillMount() {
        const viewState = new ViewState();
        this.stores = {
            algorithmChooser: new AlgorithmChooser(viewState),
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