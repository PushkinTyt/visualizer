import * as React from "react";
import {Route, Router} from "react-router";
import history from "./history";
import {FullDiv} from "../components/fullDiv";
import {MainView} from "../components/mainView/mainView";

export interface RoutersProps {
}

export interface RoutersState {
}

export class Routers extends React.Component<RoutersProps, RoutersState> {

    render() {
        return (
            <Router history={history}>
                <FullDiv>
                    <Route exact path="/" component={MainView}/>
                </FullDiv>
            </Router>
        );
    }
}