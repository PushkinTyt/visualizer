import {RGBChanel} from "../components/colorPicker/stores/RGBStoreIdent";
export function getChanelDescription(chanel: RGBChanel): string {
    switch (chanel) {
        case RGBChanel.Blue:
            return "B";
        case RGBChanel.Red:
            return "R";
        case RGBChanel.Green:
            return "G";
    }
}

export function extendObject<T>(obj1: T, obj2: T): T {
    let obj3: T = {} as T;
    for (let attrName in obj1) {
        obj3[attrName] = obj1[attrName];
    }
    for (let attrName in obj2) {
        obj3[attrName] = obj2[attrName];
    }
    return obj3;
}