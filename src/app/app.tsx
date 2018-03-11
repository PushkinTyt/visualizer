import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {mainClass} from "./app.less";
import {Component} from "react";
import {Routers} from "../route/routers";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import {FullDiv} from "../components/fullDiv";
import {MainStoreProvider} from "../stores/mainStoreProvaider";
import {Menu} from "../components/menu/menu";

let PerfectScrollbar = require("react-perfect-scrollbar");

export interface AppProps {
}

export interface AppState {
}

export class App extends Component<AppProps, AppState> {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <MainStoreProvider>
                    <FullDiv>
                        <AppBar
                            zDepth={2}
                            showMenuIconButton={false}
                            title="Визуализатор сортировок"
                            iconElementRight={<Menu></Menu>}
                        />
                        <div className={mainClass}>
                            <PerfectScrollbar>
                                <div>
                                    <Routers/>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </FullDiv>
                </MainStoreProvider>
            </MuiThemeProvider>
        );
    }
}