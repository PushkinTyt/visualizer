import * as React from "react";
import {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import AddIcon from 'material-ui/svg-icons/content/add';
import SwapIcon from 'material-ui/svg-icons/action/swap-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {computed} from "mobx";
import {ArrayElement} from "../../algorithms/arrayElement";
import TextField from "material-ui/TextField";
import {FullDiv} from "../fullDiv";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {ArrayStateStore} from "../../stores/arrayStateStore";
import './ArrayEditor.less'
import {autobind} from "core-decorators";
import {getUnicString} from "../../utils/utils";

export interface ArrayEditorProps {
    arrayStore?: ArrayStateStore;
}

@inject('arrayStore')
@observer
export class ArrayEditor extends Component<ArrayEditorProps, undefined> {

    @computed
    get elements(): ArrayElement[] {
        let arrayStore = this.props.arrayStore;
        return arrayStore && arrayStore.elements || []
    }

    @computed
    get count(): number {
        return this.elements.length
    }

    rows() {
        return this.elements.map((element, index) => {
            return (
                <Row key={element.id}>
                    <Col xs={12}>
                        {this.elementEditor(element, index)}
                    </Col>
                </Row>
            );
        })
    }

    @autobind
    onChangeValue(element: ArrayElement, value: string) {
        element.value = value
    }

    elementEditor(element: ArrayElement, index: number) {
        return (
            <FullDiv style={{position: 'relative'}}>
                {this.addBeforeButton(element, index)}
                <div className={'array-element'}>
                    <div className={'array-element-input'}>
                        <TextField floatingLabelText={`a[${index}]`}
                                   fullWidth={true}
                                   value={element.value}
                                   underlineShow={true}/>
                    </div>
                    <div className={'array-element-buttons'}>
                        <FloatingActionButton
                            className={'array-element-buttons--button'}
                            mini={true}>
                            <DeleteIcon/>
                        </FloatingActionButton>
                    </div>
                </div>
                {this.addAfterButton(element, index)}
            </FullDiv>
        );
    }

    addBeforeButton(element: ArrayElement, index: number) {
        if (index !== 0) {
            return null
        }

        return (
            <FullDiv className={'array-element--before'}>
                <FloatingActionButton
                    className={'array-element--before-button'}
                    mini={true}>
                    <AddIcon/>
                </FloatingActionButton>
            </FullDiv>
        );
    }

    addAfterButton(element: ArrayElement, index: number) {
        return (
            <FullDiv className={'array-element--after'}>
                <FloatingActionButton
                    className={'array-element--before-button'}
                    mini={true}>
                    <AddIcon/>
                </FloatingActionButton>
                {(index !== (this.count - 1)) ?
                    <FloatingActionButton
                        className={'array-element--before-button'}
                        mini={true}>
                        <SwapIcon/>
                    </FloatingActionButton> : null}
            </FullDiv>
        );
    }

    render() {
        if (!this.count) {
            return (
                <Grid className={'array-editor'}>
                    <FullDiv className={'array-element--before'}>
                        <FloatingActionButton
                            className={'array-element--before-button'}
                            mini={true}>
                            <AddIcon/>
                        </FloatingActionButton>
                    </FullDiv>
                </Grid>
            );
        }


        return (
            <Grid className={'array-editor'}>
                {this.rows()}
            </Grid>
        );
    }
}