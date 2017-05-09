import * as React from "react";
import {RouteComponentProps} from "react-router";
import Paper from "material-ui/Paper";
import {Provider} from "mobx-react";
import {RGBChanel, RGBStoreIdent} from "./stores/RGBStoreIdent";
import {RGBStore} from "./stores/rgbStore";
import {RGBView} from "../RGBView/RGBView";
import {ColorSlider} from "../colorSlider/colorSlider";
import {UrlHandler} from "./urlHandler";
import {Col, Grid, Row} from "react-bootstrap";
import {CanvasDDView} from "../canvasDDView/canvasDDView";

export interface ParamColorPicker {
    color?: string;
}

export interface ColorPickerProps extends RouteComponentProps<ParamColorPicker> {
}

export interface ColorPickerState {
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

    RGBStore: RGBStore;

    getUrlColor(): string {
        return this.props.match.params.color || "fff";
    }

    componentWillMount() {
        this.RGBStore = new RGBStore(this.getUrlColor());
    }

    componentWillReceiveProps(nextProps: ColorPickerProps) {
        let color = nextProps.match.params && nextProps.match.params.color || "fff";
        if (this.getUrlColor() !== color && this.RGBStore.HEX !== color) {
            this.RGBStore.updateHEX(color);
        }
    }

    render() {
        return (
            <Provider {...{[RGBStoreIdent]: this.RGBStore}}>
                <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={3} lg={4}>
                                <RGBView/>
                            </Col>
                            <Col xs={12} sm={9} lg={4}>
                                <ColorSlider chanel={RGBChanel.Red}/>
                                <ColorSlider chanel={RGBChanel.Green}/>
                                <ColorSlider chanel={RGBChanel.Blue}/>
                            </Col>
                            <Col xs={12} sm={12} lg={4}>
                                <CanvasDDView/>
                            </Col>
                        </Row>
                    </Grid>
                    <UrlHandler history={this.props.history}/>
                </Paper>

            </Provider>
        );
    }
}