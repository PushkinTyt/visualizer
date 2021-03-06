import {ArrayElement} from "./arrayElement";

export enum HighLightType {
    PERMUTATION,
    COMPARISON,
    SELECT
}

export class ArrayElementHighlight {
    constructor(public element: ArrayElement, public type: HighLightType) {
    }

    public static comparison(element: ArrayElement) {
        return new ArrayElementHighlight(element, HighLightType.COMPARISON);
    }

    public static permutation(element: ArrayElement) {
        return new ArrayElementHighlight(element, HighLightType.PERMUTATION);
    }

    public static select(element: ArrayElement) {
        return new ArrayElementHighlight(element, HighLightType.SELECT);
    }
}