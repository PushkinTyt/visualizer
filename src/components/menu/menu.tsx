import * as React from "react";
import {Component} from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from "material-ui/MenuItem";

export interface MenuProps {

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
                <MenuItem primaryText="Сбросить"/>
                <MenuItem primaryText="Редактировать массив"/>
                <MenuItem primaryText="Выбор алгоритма"/>
            </IconMenu>
        );
    }
}