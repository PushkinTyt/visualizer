import * as React from "react";
import {RGBStoreIdent, RGBStoreProps} from "../colorPicker/stores/RGBStoreIdent";
import {inject, observer} from "mobx-react";
import {ObserverComponent} from "../observerComponent";
import {rgbView, rgbViewContent, rgbWrap} from "./RGBView.less";
import Paper from "material-ui/Paper";

export interface RGBViewProps extends RGBStoreProps {
}

export interface RGBViewState {
}

@inject(RGBStoreIdent)
@observer
export class RGBView extends ObserverComponent<RGBViewProps, RGBViewState> {

    getName(): string {
        return "RGBView";
    }

    render() {
        let rgbStore = this.props.RGBStore;
        if (!rgbStore) {
            return null;
        }
        return (
            <div className={rgbWrap}>
                <Paper zDepth={1} className={rgbView} circle
                       style={{background: `#${rgbStore.HEX}`, color: `#${rgbStore.contrastTextColor}`}}>
                    <div className={rgbViewContent}>
                        <span>{`RGB(${rgbStore.r},${rgbStore.g},${rgbStore.b})`}</span>
                        <br/>
                        <span>{`HEX:#${rgbStore.HEX}`}</span>
                    </div>
                </Paper>
            </div>
        );
    }
}