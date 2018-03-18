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
import {autobind, debounce} from "core-decorators";
import {getUnicNumber} from "../../utils/utils";

export interface ArrayEditorProps {
    arrayStore?: ArrayStateStore;
    onChangeElement: () => void
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
    @debounce(1000)
    onChangeValue(element: ArrayElement, inputValue: string | number) {
        let value: number;
        if (typeof inputValue === "string") {
            value = parseInt(inputValue);
        } else {
            value = inputValue;
        }
        if (isNaN(value)) {
            value = 0
        }
        element.value = value;
        this.props.onChangeElement()
    }

    elementEditor(element: ArrayElement, index: number) {
        return (
            <FullDiv style={{position: 'relative'}}>
                {this.addBeforeButton(element, index)}
                <div className={'array-element'}>
                    <div className={'array-element-input'}>
                        <TextField floatingLabelText={`a[${index}]`}
                                   fullWidth={true}
                                   key={element.id}
                                   type="number"
                                   onChange={(event, value) => this.onChangeValue(element, value)}
                                   defaultValue={element.value}
                                   underlineShow={true}/>
                    </div>
                    <div className={'array-element-buttons'}>
                        <FloatingActionButton
                            onTouchTap={() => this.delete(element)}
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
                    onTouchTap={() => this.addBefore(element)}
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
                    onTouchTap={() => this.addAfter(element)}
                    className={'array-element--before-button'}
                    mini={true}>
                    <AddIcon/>
                </FloatingActionButton>
                {(index !== (this.count - 1)) ?
                    <FloatingActionButton
                        onTouchTap={() => this.swapAfter(element)}
                        className={'array-element--before-button'}
                        mini={true}>
                        <SwapIcon/>
                    </FloatingActionButton> : null}
            </FullDiv>
        );
    }

    makeEmptyElement(): ArrayElement {
        let unicNumber = getUnicNumber();
        let value = Math.floor(Math.random() * (100)) - 50;
        return {
            id: `id_${unicNumber}`,
            value: value
        }
    }

    @autobind
    createFirstElement() {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.add(this.makeEmptyElement(), 0);
            this.props.onChangeElement();
        }
    }

    @autobind
    delete(element: ArrayElement) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.delete(element);
            this.props.onChangeElement();
        }
    }

    @autobind
    addBefore(element: ArrayElement) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.addBefore(element, this.makeEmptyElement());
            this.props.onChangeElement();
        }
    }

    @autobind
    addAfter(element: ArrayElement) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.addAfter(element, this.makeEmptyElement());
            this.props.onChangeElement();
        }
    }

    @autobind
    swapAfter(element: ArrayElement) {
        let arrayStore = this.props.arrayStore;
        if (arrayStore) {
            arrayStore.swapAfter(element);
            this.props.onChangeElement();
        }
    }

    render() {
        if (!this.count) {
            return (
                <FullDiv className={'array-editor'}>
                    <FullDiv className={'array-element--before'}>
                        <FloatingActionButton
                            onTouchTap={this.createFirstElement}
                            className={'array-element--before-button'}
                            mini={true}>
                            <AddIcon/>
                        </FloatingActionButton>
                    </FullDiv>
                </FullDiv>
            );
        }


        return (
            <div className={'array-editor'}>
                {this.rows()}
            </div>
        );
    }
}