import * as React from "react";
import {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {mainClass} from "./app.less";
import {Routers} from "../route/routers";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {FullDiv} from "../components/fullDiv";
import {MainStoreProvider} from "../stores/mainStoreProvaider";
import {MainScreenAppBar} from "../components/menu/MainScreenAppBar";
import history from "../route/history";
import {Route, Router} from "react-router";
import {EditArrayAppBar} from "../components/menu/EditArrayAppBar";
import {AppStore} from "../stores/appStore";

let PerfectScrollbar = require("react-perfect-scrollbar");

export interface AppProps {
}

export interface AppState {
}

export class App extends Component<AppProps, AppState> {

    appStore:AppStore;

    componentWillMount() {
        this.appStore = new AppStore()
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(this.appStore.theme.ui)}>
                <MainStoreProvider app={this.appStore}>
                    <FullDiv className={`${this.appStore.theme.mainClassName} ${mainClass}`}>
                        <Router history={history}>
                            <Route exact path="/" component={MainScreenAppBar}/>
                        </Router>
                        <Router history={history}>
                            <Route exact path="/editArray" component={EditArrayAppBar}/>
                        </Router>
                        <div>
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