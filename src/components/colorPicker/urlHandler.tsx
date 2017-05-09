import * as React from "react";
import {RGBStoreIdent, RGBStoreProps} from "./stores/RGBStoreIdent";
import {inject, observer} from "mobx-react";
import {ObserverComponent} from "../observerComponent";
import * as H from 'history';

export interface UrlHandlerProps extends RGBStoreProps {
    history: H.History
}

export interface UrlHandlerState {
}

@inject(RGBStoreIdent)
@observer
export class UrlHandler extends ObserverComponent<UrlHandlerProps, UrlHandlerState> {

    getName(): string {
        return "UrlHandler"
    }

    didUpdate() {
        let rgbStore = this.props.RGBStore;
        if (rgbStore) {
            // this.props.history.push(`/color/${rgbStore.HEX}`);
            this.props.history.replace(`/color/${rgbStore.HEX}`);
            // this.props.history.location = `/color/${rgbStore.HEX}`;
        }
    }

    render() {
        let rgbStore = this.props.RGBStore;
        let hex = rgbStore && rgbStore.HEX;
        return (
            null
        );
    }
}