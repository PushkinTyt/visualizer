import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";
import {FullDiv} from "../fullDiv";
import {AlgorithmContolPanel} from "../algorithmContolPanel/algorithmContolPanel";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";
import {CodeListing} from "../codeListing/codeListing";
import {ArrayView} from "../ArrayView/ArrayView";
import Paper from "material-ui/Paper";
import {AlgorithmChooser} from "../algorithmChooser/algorithmChooser";

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
                            <AlgorithmChooser/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} lg={12}>
                            <AlgorithmMsg/>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col xs={12} sm={12} lg={12}>
                                <Paper zDepth={2} style={{margin: 25, padding: 20}}>
                                    <ArrayView inStep={true}/>
                                </Paper>
                            </Col>
                        </Row>
                        <Col xs={12} sm={12} lg={12}>
                            <CodeListing/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6} lg={6}>
                            <AlgorithmContolPanel/>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}