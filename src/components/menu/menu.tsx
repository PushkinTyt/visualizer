import * as React from "react";
import {Component} from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from "material-ui/MenuItem";
import history from "../../route/history";
import {RouteComponentProps} from "react-router";

export interface MenuProps extends RouteComponentProps<{}> {

}

export class Menu extends Component<MenuProps, {}> {
    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Редактировать массив" onClick={() => history.push('/editArray')}/>
            </IconMenu>
        );
    }
}