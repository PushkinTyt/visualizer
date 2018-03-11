import * as React from "react";
import {Route, Router} from "react-router";
import history from "./history";
import {FullDiv} from "../components/fullDiv";
import {MainView} from "../components/mainView/mainView";
import {EditArray} from "../components/editArray/editArray";

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
                    <Route exact path="/editArray" component={EditArray}/>
                </FullDiv>
            </Router>
        );
    }
}