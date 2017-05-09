import {action, computed, observable} from "mobx";
import {RGBChanel} from "./RGBStoreIdent";
import Color = require("color");
const hexRgb = require("hex-rgb");
const rgbHex = require("rgb-hex");

export type RGB = [number, number, number];

export class RGBStore {
    constructor(hexOrR: string | number, g?: number, b?: number) {
        if (typeof hexOrR === "string") {
            this.updateHEX(hexOrR, true);
        } else {
            this.setRGB([hexOrR, g, b] as RGB)
        }
    }

    @observable
    r: number | null;

    @observable
    g: number | null;

    @observable
    b: number | null;

    @computed
    get HEX(): string {
        return rgbHex(this.r || 0, this.g || 0, this.b || 0);
    }

    @computed
    get contrastTextColor(): string {
        let {r, g, b} = this;
        let color = Color({r: r || 0, g: g || 0, b: b || 0});
        if (color.light()) {
            return "000000";
        } else {
            return "ffffff";
        }
    }

    set HEX(hex: string) {
        this.updateHEX(hex);
    }

    updateHEX(hex: string, silence?: boolean) {
        let rgb: RGB;
        try {
            rgb = hexRgb(hex);
        } catch (e) {
            rgb = [100, 100, 100];
        }
        if (silence) {
            this.setRGB(rgb);
        } else {
            this.updateRGB(rgb);
        }
    }

    @action
    updateRGB(input: RGB) {
        this.setRGB(input);
    }

    @action
    updateB(input: number) {
        if (input < 0) {
            this.b = 0;
        } else if (input > 255) {
            this.b = 255;
        } else {
            this.b = input;
        }
    }

    @action
    updateRG(inputR: number, inputG: number) {
        if (inputR < 0) {
            this.r = 0;
        } else if (inputR > 255) {
            this.r = 255;
        } else {
            this.r = inputR;
        }
        if (inputG < 0) {
            this.g = 0;
        } else if (inputG > 255) {
            this.g = 255;
        } else {
            this.g = inputG;
        }
    }

    setRGB(input: RGB) {
        this.r = input[0];
        this.g = input[1];
        this.b = input[2];
    }

    getChanel(chanel: RGBChanel | null): number | null {
        switch (chanel) {
            case RGBChanel.Blue:
                return this.b;
            case RGBChanel.Green:
                return this.g;
            case RGBChanel.Red:
                return this.r;
            default:
                return 0;
        }
    }

    @action
    setChanel(chanel: RGBChanel, value: number | null) {
        switch (chanel) {
            case RGBChanel.Blue:
                this.b = value;
                break;
            case RGBChanel.Green:
                this.g = value;
                break;
            case RGBChanel.Red:
                this.r = value;
                break;
        }
    }
}