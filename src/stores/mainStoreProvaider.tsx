import * as React from "react";
import {Provider} from "mobx-react";
import {AlgorithmChooserStore} from "./algorithmChooserStore";
import {ViewStateStore} from "./viewStateStore";
import {ArrayStateStore} from "./arrayStateStore";
import {reaction} from "mobx";
import {AppStore} from "./appStore";

export interface MainStoreProviderStores {
    algorithmChooser: AlgorithmChooserStore;
    viewState: ViewStateStore;
    arrayStore: ArrayStateStore;
    appStore:AppStore;
}

export class MainStoreProvider extends React.Component<{app:AppStore}, Readonly<{}>> {

    stores: MainStoreProviderStores;

    componentWillMount() {
        const viewState = new ViewStateStore();
        const arrayStore = new ArrayStateStore();
        const algorithmChooser = new AlgorithmChooserStore(viewState, arrayStore)

        this.stores = {
            algorithmChooser,
            viewState,
            arrayStore,
            appStore: this.props.app
        }

        reaction(
            () => viewState.steps,
            steps => {
                viewState.currentStep = steps[0];
            }
        );
    }

    render(): JSX.Element | null {
        return (
            <Provider {...this.stores}>
                {this.props.children}
            </Provider>
        )
    }
}