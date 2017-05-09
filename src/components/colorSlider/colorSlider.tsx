import * as React from "react";
import {RGBChanel, RGBStoreIdent, RGBStoreProps} from "../colorPicker/stores/RGBStoreIdent";
import {inject, observer} from "mobx-react";
import {ObserverComponent} from "../observerComponent";
import Slider from "material-ui/Slider";
import {autobind} from "core-decorators";
import {colorSlider, slider, value} from "./colorSlider.less";
import TextField from "material-ui/TextField";
import {getChanelDescription} from "../../utils/utils";

export interface ColorSliderProps extends RGBStoreProps {
    chanel: RGBChanel
}

export interface ColorSliderState {
}

@inject(RGBStoreIdent)
@observer
export class ColorSlider extends ObserverComponent<ColorSliderProps, ColorSliderState> {

    getName(): string {
        return `ColorSlider${this.getDescription()}`;
    }

    getValue(): number | null {
        let rgbStore = this.props.RGBStore;
        return rgbStore && rgbStore.getChanel(this.props.chanel) || null;
    }

    @autobind
    setValue(event: React.MouseEvent<{}> | React.FormEvent<{}>, inputValue: number | string) {
        let value: number | null;
        if (typeof inputValue === "string") {
            value = parseInt(inputValue);
        } else {
            value = inputValue;
        }
        let rgbStore = this.props.RGBStore;
        if (isNaN(value)) {
            value = null
        }
        if (value && value < 0) {
            value = 0
        }
        if (value && value > 255) {
            value = 255;
        }
        rgbStore && rgbStore.setChanel(this.props.chanel, value);
    }

    getDescription(): string {
        return getChanelDescription(this.props.chanel);
    }

    render() {
        let valueColor = this.getValue();
        return (
            <div className={colorSlider}>
                <div className={value}>
                    <TextField
                        type="number"
                        min={0}
                        max={255}
                        value={valueColor || ""}
                        hintText=""
                        floatingLabelText={this.getDescription()}
                        floatingLabelFixed={true}
                        onChange={this.setValue}
                        fullWidth={true}
                    />
                </div>
                <div className={slider}>
                    <Slider
                        min={0}
                        max={255}
                        step={1}
                        value={valueColor || 0}
                        onChange={this.setValue}
                        axis="y"
                        style={{height: 40}}
                    />
                </div>
            </div>
        );
    }
}