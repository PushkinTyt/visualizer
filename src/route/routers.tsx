import * as React from "react";
import {Route, Router} from "react-router";
import history from "./history";
import {FullDiv} from "../components/fullDiv";
import {MainView} from "../components/mainView/mainView";
import {EditArray} from "../components/editArray/editArray";
const AnyRoute:any = Route as any;
export interface RoutersProps {
}

export interface RoutersState {
}

export class Routers extends React.Component<RoutersProps, RoutersState> {

    render() {
        return (
            <Router history={history}>
                <FullDiv>
                    <AnyRoute exact path="/" component={MainView}/>
                    <AnyRoute exact path="/editArray" component={EditArray}/>
                </FullDiv>
            </Router>
        );
    }
}