import * as React from "react";
import {CanvasView} from "../canvasView/canvasView";
import {RGBChanel} from "../colorPicker/stores/RGBStoreIdent";

export interface CanvasPlaceProps {
    height: number;
    width: number;
}

export interface CanvasPlaceState {
}

export class CanvasPlace extends React.Component<CanvasPlaceProps, CanvasPlaceState> {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        let {height, width} = this.props;
        return (
            <CanvasView
                height={height}
                width={width}
                rgbMap={["x", "y", RGBChanel.Blue]}
            />
        );
    }
}