import {Template} from "./template";
import {getUnicString} from "../../utils/utils";

export const customTemplateIdent = getUnicString()

export class CustomTemplate extends Template {

    ident: string = customTemplateIdent;

    constructor() {
        super({templateName: 'Пользовательский', elements: []})
    }
}