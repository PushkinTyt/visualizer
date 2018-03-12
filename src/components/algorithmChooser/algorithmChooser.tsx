import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {MenuItem, SelectField} from "material-ui";

export interface AlgorithmChooserProps {
    algorithmChooser?: AlgorithmChooserStore
}

const style = {
    marginRight: 20,
};

@inject('algorithmChooser')
@observer
export class AlgorithmChooser extends Component<AlgorithmChooserProps, undefined> {

    _createAlgorithmChooserItems() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithms = algorithmChooser && algorithmChooser.algorithms.values();

        let menuItems = [];
        for (let i = 0; algorithms && i < algorithms.length; i++) {
            let algorithm = algorithms[i];
            let item = (
                <MenuItem
                    value={algorithm}
                    key={algorithm.id}
                    primaryText={algorithm.getAlgName()}
                />
            );

            menuItems.push(item);
        }

        return menuItems;
    }


    render() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;
        let algorithmName = algorithm && algorithm.id;

        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <SelectField fullWidth={true}
                             floatingLabelText="Алгоритм сортировки"
                             value={algorithm}
                             onChange={(event, index, value) => algorithmChooser && algorithmChooser.choose(value)}>
                    {this._createAlgorithmChooserItems()}
                </SelectField>
            </Paper>
        );
    }
}