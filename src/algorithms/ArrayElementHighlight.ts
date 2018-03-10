export enum HighLightType {
    PERMUTATION,
    COMPARISON
}

export class ArrayElementHighlight {
    constructor(public id: string, public type: HighLightType) {
    }
}