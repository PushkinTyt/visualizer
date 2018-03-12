import {getUnicString} from "../utils/utils";

export class AbstractView {
    id: string = getUnicString();

    constructor(public name:string, public view:any) {

    }
}