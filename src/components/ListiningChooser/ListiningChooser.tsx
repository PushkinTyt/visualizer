import * as React from "react";
import {Component} from "react";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {MenuItem, SelectField} from "material-ui";
import {computed} from "mobx";
import {AbstractView} from "../../algorithms/abstractView";
import Badge from "material-ui/Badge";
import AddIcon from 'material-ui/svg-icons/content/link';
import IconButton from "material-ui/IconButton";

export interface ListiningChooserProps {
    algorithmChooser?: AlgorithmChooserStore
}

@inject('algorithmChooser')
@observer
export class ListiningChooser extends Component<ListiningChooserProps, undefined> {

    @computed
    get views(): AbstractView[] {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;
        return algorithm && algorithm.getViews() || []
    }

    @computed
    get noItems(): boolean {
        return !this.views.length
    }


    render() {
        let algorithmChooser = this.props.algorithmChooser;

        let algorithm = algorithmChooser && algorithmChooser.algorithm;
        if (!algorithm) {
            return <div/>
        }

        if (this.noItems) {
            return <Badge
                badgeContent={<IconButton href={'https://github.com/PushkinTyt/visualizer'}>
                    <AddIcon/>
                </IconButton>}>
                Для этого алгоритма нет листинга, ты можешь добавить его сам
            </Badge>
        }

        let viewId = algorithmChooser && algorithmChooser.viewId;

        return (
            <SelectField fullWidth={true}
                         floatingLabelText={'Выберите язык программирования'}
                         value={viewId}
                         onChange={(event, index, value) => {
                             if (algorithmChooser) {
                                 algorithmChooser.viewId = value
                             }
                         }}>
                <MenuItem
                    value={null}
                    primaryText={''}
                />
                {this.views.map(view => <MenuItem
                    value={view.id}
                    key={view.id}
                    primaryText={view.name}
                />)}
            </SelectField>
        );
    }
}