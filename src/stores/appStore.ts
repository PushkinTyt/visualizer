import {observable} from "mobx";
import {MuiTheme} from "material-ui/styles";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

export interface ThemeItem {
    ui: MuiTheme;
    title: string;
    mainClassName: string;
}

export class AppStore {

    @observable
    theme: ThemeItem;

    themes: ThemeItem[] = [{
        ui: lightBaseTheme,
        title: 'Светлая тема',
        mainClassName: 'lightBaseTheme'
    }, {
        ui: darkBaseTheme,
        title: 'Темная тема',
        mainClassName: 'darkBaseTheme'
    }]

    constructor() {
        this.theme = this.themes[0]
    }
}