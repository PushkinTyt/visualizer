export interface ArrayElement {
    id: number,
    value: string|number
}

export class ArrayState {
    arrayView: ArrayElement[]
}