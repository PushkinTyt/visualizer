import * as React from "react";
import {RouteComponentProps} from "react-router";
import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-bootstrap";
import {Step} from "../step/step";
import {MainStoreProvider} from "../../stores/mainStoreProvaider";

export interface MainViewProps extends RouteComponentProps<{}> {
}

export interface MainViewState {
}

export class MainView extends React.Component<MainViewProps, MainViewState> {

    render() {
        return (
            <MainStoreProvider>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={3} lg={4}>
                                <Step/>
                            </Col>
                            <Col xs={12} sm={9} lg={4}>
                            </Col>
                            <Col xs={12} sm={12} lg={4}>
                            </Col>
                        </Row>
                    </Grid>
                </Paper>
            </MainStoreProvider>
        );
    }
}