import * as React from "react";
import {Component} from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from "material-ui/MenuItem";
import history from "../../route/history";
import {RouteComponentProps} from "react-router-dom";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import {AlgorithmMsg} from "../algorithmMsg/algorithmMsg";
import {AppStore} from "../../stores/appStore";
import {autobind} from "core-decorators";
import {inject, observer} from "mobx-react";
import {ViewStateStore} from "../../stores/viewStateStore";

export interface MenuProps extends RouteComponentProps<any> {
    appStore?:AppStore;
    viewState?: ViewStateStore;
}

@inject('appStore')
@inject('viewState')
export class MainScreenAppBar extends Component<MenuProps, Readonly<{}>> {

    @autobind
    thems():JSX.Element[] {
        let appStore = this.props.appStore;
        let themes = appStore && appStore.themes || [];
        return themes.map(
            (theme) => {
                return (
                    <MenuItem
                        primaryText={theme.title}
                        key={theme.mainClassName}
                        onClick={() => {
                            appStore!.theme = theme
                        }}/>
                )
            }
        )
    }

    setSpeed(value:number) {
        let viewState = this.props.viewState;

        if (viewState) {
            viewState.animationStep = value
        }
    }

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
                        {this.thems()}
                        <Divider/>
                        <MenuItem
                            primaryText={"Медленая анимация"}
                            onClick={() => {
                                this.setSpeed(2000)
                            }}/>
                        <MenuItem
                            primaryText={"Средняя анимация"}
                            onClick={() => {
                                this.setSpeed(1000)
                            }}/>
                        <MenuItem
                            primaryText={"Быстрая анимация"}
                            onClick={() => {
                                this.setSpeed(100)
                            }}/>
                        <MenuItem
                            primaryText={"Без анимации"}
                            onClick={() => {
                                this.setSpeed(0)
                            }}/>
                    </IconMenu>
                }
                iconElementLeft={<div/>}
            />
        );
    }
}