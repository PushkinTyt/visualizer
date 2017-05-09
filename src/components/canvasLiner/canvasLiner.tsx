import * as React from "react";
import {RGBChanel} from "../colorPicker/stores/RGBStoreIdent";
import {CanvasView} from "../canvasView/canvasView";

export interface CanvasLinerProps {
    height: number;
    width: number;
}

export interface CanvasLinerState {
}

export class CanvasLiner extends React.Component<CanvasLinerProps, CanvasLinerState> {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        let {height, width} = this.props;
        return (
            <CanvasView
                height={height}
                width={width}
                rgbMap={[RGBChanel.Red, RGBChanel.Green, "y"]}
            />
        );
    }
}