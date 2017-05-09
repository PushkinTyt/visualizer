import * as React from "react";
import {CanvasLiner} from "../canvasLiner/canvasLiner";
import {CanvasPlace} from "../canvaPlace/canvaPlace";
import {canvasDDView, canvasView, linerView, placeView} from "./canvasDDView.less";
import {inject, observer} from "mobx-react";
import {RGBStoreIdent, RGBStoreProps} from "../colorPicker/stores/RGBStoreIdent";
import {ObserverComponent} from "../observerComponent";
import {CSSProperties} from "react";
import {extendObject} from "../../utils/utils";
import {autobind, throttle} from "core-decorators";

export interface CanvasDDViewProps extends RGBStoreProps {
}

export interface CanvasDDViewState {
}

const width = 250;
const height = 150;

@inject(RGBStoreIdent)
@observer
export class CanvasDDView extends ObserverComponent<CanvasDDViewProps, CanvasDDViewState> {

    placeView: HTMLDivElement;

    linerView: HTMLDivElement;

    getName(): string {
        return "CanvasDDView";
    }

    getCommonStyle(): CSSProperties {
        let {RGBStore} = this.props;
        if (!RGBStore) {
            return {};
        }

        return {
            background: "#" + RGBStore.HEX
        }
    }

    getPlaceCursorStyle(): CSSProperties {
        let {RGBStore} = this.props;
        if (!RGBStore) {
            return {};
        }

        let greenValue = (RGBStore.g || 0) * height / 255;
        let redValue = (RGBStore.r || 0) * width / 255;

        return {
            top: greenValue,
            left: redValue
        }
    }

    getLinerCursorStyle(): CSSProperties {
        let {RGBStore} = this.props;
        if (!RGBStore) {
            return {};
        }

        let blueValue = (RGBStore.b || 0) * height / 255;

        return {
            top: blueValue,
            left: 6
        }
    }

    @autobind
    @throttle(100, {leading: true, trailing: true})
    DDMouseLinerHandler(event: MouseEvent) {
        let {RGBStore} = this.props;
        if (!RGBStore) {
            return false;
        }

        let {top, left} = this.linerView.getBoundingClientRect();
        let blueValue = (event.clientY - top) / height * 255;
        RGBStore.updateB(~~blueValue);
        return false;
    }

    @autobind
    @throttle(100, {leading: true, trailing: true})
    DDMousePlaceHandler(event: MouseEvent) {
        let {RGBStore} = this.props;
        if (!RGBStore) {
            return false;
        }

        let {top, left} = this.placeView.getBoundingClientRect();
        let redValue = (event.clientX - left) / width * 255;
        let greenValue = (event.clientY - top) / height * 255;
        RGBStore.updateRG(~~redValue, ~~greenValue);
        return false;
    }

    @autobind
    makeLinkHandlersLiner() {
        window.addEventListener("mouseup", this.removeEventListenerLiner);
        this.linerView.addEventListener<"mousemove">("mousemove", this.DDMouseLinerHandler);
    }

    @autobind
    removeEventListenerLiner() {
        window.removeEventListener("mouseup", this.removeEventListenerLiner);
        this.linerView.removeEventListener("mousemove", this.DDMouseLinerHandler);
    }

    @autobind
    makeLinkHandlersPlace() {
        window.addEventListener("mouseup", this.removeEventListenerPlace);
        this.placeView.addEventListener<"mousemove">("mousemove", this.DDMousePlaceHandler);
    }

    @autobind
    removeEventListenerPlace() {
        window.removeEventListener("mouseup", this.removeEventListenerPlace);
        this.placeView.removeEventListener("mousemove", this.DDMousePlaceHandler);
    }

    render() {
        let commonCursorStyle = this.getCommonStyle();
        let linerCursor = this.getLinerCursorStyle();
        let placeCursor = this.getPlaceCursorStyle();
        return (
            <div className={canvasDDView}>
                <div className={canvasView}>
                    <div className={placeView} ref={ref => this.placeView = ref}>
                        <div className="cursor" style={extendObject(commonCursorStyle, placeCursor)}
                             onMouseDown={this.makeLinkHandlersPlace}/>
                        <CanvasPlace width={width} height={height}/>
                    </div>
                    <div className={linerView} ref={ref => this.linerView = ref}>
                        <div className="cursor" style={extendObject(commonCursorStyle, linerCursor)}
                             onMouseDown={this.makeLinkHandlersLiner}/>
                        <CanvasLiner width={5} height={height}/>
                    </div>
                </div>
            </div>
        );
    }
}