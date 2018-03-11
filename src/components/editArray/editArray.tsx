import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import {ArrayStateStore, ArrayTemplate} from "../../stores/arrayStateStore";
import {FullDiv} from "../fullDiv";
import {computed} from "mobx";
import SelectField from "material-ui/SelectField";
import {autobind} from "core-decorators";
import {TouchTapEvent} from "material-ui";
import MenuItem from "material-ui/MenuItem";
import {RouteComponentProps} from "react-router";
import FlatButton from "material-ui/FlatButton";
import {ArrayView} from "../ArrayView/ArrayView";

export interface EditArrayProps extends RouteComponentProps<{}> {
    arrayStore?: ArrayStateStore;
}

@inject('arrayStore')
@observer
export class EditArray extends Component<EditArrayProps, undefined> {

    @computed
    get items(): ArrayTemplate[] {
        let arrayStore = this.props.arrayStore;
        if (arrayStore && arrayStore.templates) {
            return arrayStore.templates
        } else {
            return []
        }
    }

    @autobind
    onSelectTemplate(event: TouchTapEvent, index: number, value: string) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.chooseTemplate(value)
        }
    }

    showEditButton() {
        let arrayStore = this.props.arrayStore;
        if (!!arrayStore && !arrayStore.isCustom) {
            return <FlatButton
                style={{top: -20}}
                label="Edit"
                onTouchTap={this.setCustom}
                primary={true}/>
        } else {
            return null
        }
    }

    @autobind
    setCustom() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.setElements(arrayStore.selectedTemplate.elements)
        }
    }

    arrayView() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore && arrayStore.isCustom) {
            // return <ArrayEditor/>
            return <ArrayView/>
        } else {
            return <ArrayView/>
        }
    }

    render() {
        let arrayStore = this.props.arrayStore;
        let selectedTemplate = arrayStore && arrayStore.selectedTemplate;
        let ident = selectedTemplate && selectedTemplate.ident;
        return (
            <FullDiv>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                                <SelectField
                                    style={{marginRight: 10}}
                                    floatingLabelText="Выберите шаблон массива"
                                    value={ident}
                                    onChange={this.onSelectTemplate}>
                                    {this.items.map(template => <MenuItem
                                        primaryText={template.templateName}
                                        value={template.ident}/>)}
                                </SelectField>
                                {this.showEditButton()}
                            </Paper>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                                {this.arrayView()}
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}