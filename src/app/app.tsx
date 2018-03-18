import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {mainClass} from "./app.less";
import {Component} from "react";
import {Routers} from "../route/routers";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import {FullDiv} from "../components/fullDiv";
import {MainStoreProvider} from "../stores/mainStoreProvaider";
import {Menu} from "../components/menu/menu";
import history from "../route/history";
import {Route, Router} from "react-router";
import {BackButton} from "../components/menu/backButton";
import {AlgorithmMsg} from "../components/algorithmMsg/algorithmMsg";
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
                        <AppBar
                            zDepth={2}
                            title={<AlgorithmMsg/>}
                            iconElementRight={
                                <Router history={history}>
                                    <Route exact path="/" component={Menu}/>
                                </Router>
                            }
                            iconElementLeft={
                                <Router history={history}>
                                    <Route exact path="/editArray" component={BackButton}/>
                                </Router>
                            }
                        />
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