import * as React from "react";
import {Component} from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from "material-ui/MenuItem";
import history from "../../route/history";
import {RouteComponentProps} from "react-router";

export interface BackButtonProps extends RouteComponentProps<{}> {
}

export class BackButton extends Component<BackButtonProps, {}> {
    render() {
        return (
            <IconButton onClick={() => history.goBack()}><IconBack/></IconButton>
        );
    }
}