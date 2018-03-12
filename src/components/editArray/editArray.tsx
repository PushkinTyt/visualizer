import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import {ArrayStateStore, ArrayTemplate} from "../../stores/arrayStateStore";
import {FullDiv} from "../fullDiv";
import {computed, observable} from "mobx";
import SelectField from "material-ui/SelectField";
import {autobind} from "core-decorators";
import {TouchTapEvent} from "material-ui";
import MenuItem from "material-ui/MenuItem";
import {RouteComponentProps} from "react-router";
import FlatButton from "material-ui/FlatButton";
import {ArrayView} from "../ArrayView/ArrayView";
import {ArrayEditor} from "../ArrayEditor/ArrayEditor";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";

export interface EditArrayProps extends RouteComponentProps<{}> {
    arrayStore?: ArrayStateStore;
    algorithmChooser?: AlgorithmChooserStore;
}

@inject('arrayStore')
@inject('algorithmChooser')
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
                fullWidth={true}
                style={{top: -20}}
                label="Редактировать"
                onTouchTap={this.setCustom}/>
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

    @autobind
    finishEditArray() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;
        if (algorithm) {
            algorithm.init();
        }
    }

    @autobind
    onChangeElement() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.setElements(arrayStore.elements);
        }
    }

    arrayView() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore && arrayStore.isCustom) {
            return <ArrayEditor
                    onChangeElement={this.onChangeElement}/>
        } else {
            return <ArrayView/>
        }
    }

    render() {
        let arrayStore = this.props.arrayStore;
        let selectedTemplate = arrayStore && arrayStore.selectedTemplate;
        let ident = selectedTemplate && selectedTemplate.ident;
        let changed = arrayStore && arrayStore.changed || false;
        return (
            <FullDiv>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{flex: '1 1'}}>
                                        <SelectField
                                            fullWidth={true}
                                            style={{marginRight: 10}}
                                            floatingLabelText="Выберите шаблон массива"
                                            value={ident}
                                            onChange={this.onSelectTemplate}>
                                            {this.items.map(template => <MenuItem
                                                key={template.ident}
                                                primaryText={template.templateName}
                                                value={template.ident}/>)}
                                        </SelectField>
                                    </div>
                                    <div style={{flex: '0 1', marginLeft: 15, marginTop: 35}}>
                                        {this.showEditButton()}
                                        <FlatButton
                                            disabled={!changed}
                                            fullWidth={true}
                                            style={{top: -20}}
                                            label="применить"
                                            secondary={true}
                                            onTouchTap={this.finishEditArray}/>
                                    </div>
                                </div>
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