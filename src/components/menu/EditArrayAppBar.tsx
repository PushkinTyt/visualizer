import * as React from "react";
import {Component} from "react";
import IconButton from "material-ui/IconButton";
import IconBack from 'material-ui/svg-icons/navigation/chevron-left';
import history from "../../route/history";
import {RouteComponentProps} from "react-router";
import {AppBar} from "material-ui";

export interface BackButtonProps extends RouteComponentProps<{}> {
}

export class EditArrayAppBar extends Component<BackButtonProps, {}> {
    render() {
        return (
            <AppBar
                zDepth={2}
                title={"Редактировать алгоритм"}
                iconElementLeft={<IconButton onClick={() => history.goBack()}><IconBack/></IconButton>}
            />
        );
    }
}