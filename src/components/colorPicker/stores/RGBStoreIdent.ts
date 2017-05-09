import {RGBStore} from "./rgbStore";
export const RGBStoreIdent = "RGBStore";

export interface RGBStoreProps {
    RGBStore?: RGBStore
}

export enum RGBChanel {
    Red,
    Green,
    Blue
}