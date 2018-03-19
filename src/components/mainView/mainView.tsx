import * as React from "react";
import {RouteComponentProps} from "react-router";
import {FullDiv} from "../fullDiv";
import {AlgorithmContolPanel} from "../algorithmContolPanel/algorithmContolPanel";
import {CodeListing} from "../codeListing/codeListing";
import {ArrayView} from "../ArrayView/ArrayView";
import Paper from "material-ui/Paper";
import {AlgorithmChooser} from "../algorithmChooser/algorithmChooser";
import {ListiningChooser} from "../ListiningChooser/ListiningChooser";
import {Col, Grid, Row} from "react-bootstrap";

export interface MainViewProps extends RouteComponentProps<{}> {
}

export interface MainViewState {
}

export class MainView extends React.Component<MainViewProps, MainViewState> {


    render() {
        return (
            <FullDiv>
                <Grid>
                    <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                        <Row>
                            <Col xs={12} sm={6} lg={6}>
                                <AlgorithmChooser/>
                            </Col>
                            <Col xs={12} sm={6} lg={6}>
                                <ListiningChooser/>
                            </Col>
                        </Row>
                    </Paper>
                    <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                        <Row>
                            <Col xs={12} sm={12} lg={12}>
                                <ArrayView inStep={true}/>
                            </Col>
                        </Row>
                    </Paper>
                    <Row>
                        <Col xs={12} sm={12} lg={12}>
                            <CodeListing/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} lg={12}>
                            <AlgorithmContolPanel/>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}