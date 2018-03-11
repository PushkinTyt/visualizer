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
    onSelectTemplate(event: TouchTapEvent, index: number, value: ArrayTemplate) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.chooseTemplate(value)
        }
    }

    @autobind
    setEditTemplate() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.custom = true
        }
    }

    render() {
        let arrayStore = this.props.arrayStore;
        let selectedTemplate = arrayStore && arrayStore.selectedTemplate;
        let templates = arrayStore && arrayStore.templates || [];
        let templateName = selectedTemplate && selectedTemplate.templateName;
        return (
            <FullDiv>
                <Grid>
                    <Row>
                        <Col xs={12} sm={3} lg={3}>
                            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                                <SelectField
                                    floatingLabelText="Выберите шаблон массива"
                                    value={templateName}
                                    onChange={this.onSelectTemplate}>
                                    {this.items.map(template => <MenuItem
                                        primaryText={template.templateName}
                                        value={template}/>)}
                                </SelectField>
                            </Paper>
                        </Col>
                        <Col xs={12} sm={9} lg={9}>
                            {/*<ArrayView/>*/}
                        </Col>
                    </Row>
                </Grid>
            </FullDiv>
        );
    }
}