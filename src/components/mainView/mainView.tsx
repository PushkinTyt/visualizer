import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";
import {FullDiv} from "../fullDiv";
import {AlgorithmContolPanel} from "../algorithmContolPanel/algorithmContolPanel";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";
import {CodeListing} from "../codeListing/codeListing";

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
                        <Col xs={12} sm={12} lg={12}>
                            <AlgorithmMsg/>
                        </Col>
                        <Col xs={12} sm={12} lg={12}>
                            <CodeListing/>
                        </Col>
                        <Col xs={12} sm={12} lg={12}>
                            <AlgorithmContolPanel/>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}