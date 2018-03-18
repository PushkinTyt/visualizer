import * as React from "react";
import {Component} from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from "material-ui/MenuItem";
import history from "../../route/history";
import {RouteComponentProps} from "react-router";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";

export interface MenuProps extends RouteComponentProps<{}> {
}

export class MainScreenAppBar extends Component<MenuProps, {}> {
    render() {
        return (
            <AppBar
                zDepth={2}
                title={<AlgorithmMsg/>}
                iconElementRight={
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon/></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                        <MenuItem primaryText="Редактировать массив" onClick={() => history.push('/editArray')}/>
                        <Divider/>
                    </IconMenu>
                }
            />
        );
    }
}