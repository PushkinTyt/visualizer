import * as React from "react";
import {RGBChanel, RGBStoreIdent, RGBStoreProps} from "../colorPicker/stores/RGBStoreIdent";
import {inject, observer} from "mobx-react";
import {ObserverComponent} from "../observerComponent";
import {autobind, throttle} from "core-decorators";
import {MouseEvent} from "react";

export type rgbSwap = RGBChanel | "x" | "y";

export interface CanvasViewProps extends RGBStoreProps {
    rgbMap: [rgbSwap, rgbSwap, rgbSwap];
    width: number;
    height: number;
}

export interface CanvasViewState {
}

@inject(RGBStoreIdent)
@observer
export class CanvasView extends ObserverComponent<CanvasViewProps, CanvasViewState> {

    canvas: HTMLCanvasElement;

    getName(): string {
        return `CanvasView(${this.props.rgbMap})`;
    }

    didUpdate() {
        this.makeView();
    }

    didMount() {
        this.makeView();
    }

    @throttle(30, {leading: true, trailing: true})
    makeView() {
        let ctx = this.canvas.getContext("2d");
        let {RGBStore, height, width, rgbMap} = this.props;

        if (!ctx || !RGBStore) {
            return;
        }

        let makeDot = (ctx: CanvasRenderingContext2D, x: number, y: number, rgbMap: string) => {
            ctx.fillStyle = `rgb(${rgbMap.replace("x", x.toString()).replace("y", y.toString())})`;
            ctx.fillRect(x * width / 255, y * height / 255, 5, 5);
        }

        let yPassage = height / 5 + 1;
        let xPassage = width / 5 + 1;
        let RGBMAP: string = this.props.rgbMap.map((valMap, index) => {
            if (typeof valMap === "string") {
                if (valMap === "x") {
                    xPassage = 51;
                }else {
                    yPassage = 51;
                }
                return valMap;
            } else {
                return RGBStore && RGBStore.getChanel(valMap) || 0;
            }
        }).join(",");

        for (let y = 0; y < yPassage; y++) {
            for (let x = 0; x < xPassage; x++) {
                makeDot(ctx, x * 5, y * 5, RGBMAP);
            }
        }
    }

    makeListeners() {
        let {RGBStore, rgbMap} = this.props;
        for (let index in rgbMap) {
            let val = rgbMap[index];
            if (typeof val !== "string") {
                RGBStore && RGBStore.getChanel(val) || 0;
            }
        }
    }

    @autobind
    onClick(event: MouseEvent<HTMLCanvasElement>) {
        let {RGBStore} = this.props;
        let clientRect = this.canvas.getBoundingClientRect();
        let x = event.clientX - clientRect.left;
        let y = event.clientY - clientRect.top;
        let ctx = this.canvas.getContext("2d");
        if (!ctx || !RGBStore) {
            return;
        }
        let imgData = ctx.getImageData(x, y, 1, 1).data;
        RGBStore.setRGB([imgData[0], imgData[1], imgData[2]]);
    }

    render() {
        this.makeListeners();
        let {height, width} = this.props;
        return (
            <canvas onClick={this.onClick}
                    ref={ref => this.canvas = ref} height={height} width={width}/>
        );
    }
}