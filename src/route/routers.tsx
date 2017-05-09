import * as React from "react";
import {Route, Router} from "react-router";
import history from "./history";
import {ColorPicker} from "../components/colorPicker/colorPicker";
import {FullDiv} from "../components/fullDiv";

export interface RoutersProps {
}

export interface RoutersState {
}

export class Routers extends React.Component<RoutersProps, RoutersState> {

    render() {
        return (
            <Router history={history}>
                <FullDiv>
                    <Route exact path="/" component={ColorPicker}/>
                    <Route exact path="/color/:color" component={ColorPicker}/>
                </FullDiv>
            </Router>
        );
    }
}