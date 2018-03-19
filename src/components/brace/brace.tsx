import * as React from "react";
import {Component} from "react";

let br1 = '\{';
let br2 = '\}';

export class Brace extends Component<{}, any> {

    render() {
        return (
            <div>
                <div style={{marginLeft: 10}}>
                    {br1}
                </div>
                <div style={{marginLeft: 20}}>
                    {this.props.children}
                </div>
                <div style={{marginLeft: 10}}>
                    {br2}
                </div>
            </div>
        );
    }
}