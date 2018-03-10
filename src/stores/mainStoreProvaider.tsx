import * as React from "react";
import {Provider} from "mobx-react";
import {AlgorithmChooserStore} from "./algorithmChooserStore";
import {ViewStateStore} from "./viewStateStore";
import {ArrayStore} from "./arrayStore";
import {reaction} from "mobx";

export interface MainStoreProviderStores {
    algorithmChooser: AlgorithmChooserStore;
    viewState: ViewStateStore;
    arrayStore: ArrayStore;
}

export class MainStoreProvider extends React.Component<{}, undefined> {

    stores: MainStoreProviderStores;

    componentWillMount() {
        const viewState = new ViewStateStore();
        const arrayStore = new ArrayStore();
        reaction(
            () => viewState.steps,
            steps => {
                viewState.currentStep = steps[0];
            }
        );

        this.stores = {
            algorithmChooser: new AlgorithmChooserStore(viewState, arrayStore),
            viewState,
            arrayStore
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