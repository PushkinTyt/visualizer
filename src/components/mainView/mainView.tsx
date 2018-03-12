import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Grid, Row, Col} from "react-bootstrap";
import {FullDiv} from "../fullDiv";
import {AlgorithmContolPanel} from "../algorithmContolPanel/algorithmContolPanel";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";
import {CodeListing} from "../codeListing/codeListing";
import {ArrayView} from "../ArrayView/ArrayView";
import Paper from "material-ui/Paper";

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
                        <Col xs={12} sm={6} lg={6}>
                            <AlgorithmMsg/>
                        </Col>
                        <Col xs={12} sm={12} lg={12}>
                            <CodeListing/>
                        </Col>
                        <Col xs={12} sm={6} lg={6}>
                            <AlgorithmContolPanel/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} lg={12}>
                            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                                <ArrayView inStep={true}/>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}