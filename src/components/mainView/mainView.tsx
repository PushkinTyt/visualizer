import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";
import {FullDiv} from "../fullDiv";
import {AlgorithmContolPanel} from "../algorithmContolPanel/algorithmContolPanel";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";

export interface MainViewProps extends RouteComponentProps<{}> {
}

export interface MainViewState {
}

export class MainView extends React.Component<MainViewProps, MainViewState> {

    render() {
        return (
            <FullDiv>
                <Grid>
                    <Row>
                        <Col xs={12} sm={9} lg={9}>
                            <AlgorithmMsg/>
                        </Col>
                        <Col xs={12} sm={3} lg={3}>
                            <AlgorithmContolPanel/>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}