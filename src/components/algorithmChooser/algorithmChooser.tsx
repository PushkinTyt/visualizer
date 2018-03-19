import * as React from "react";
import {Component} from "react";
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
export class AlgorithmChooser extends Component<AlgorithmChooserProps, Readonly<{}>> {

    _createAlgorithmChooserItems() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithms = algorithmChooser && algorithmChooser.algorithms;

        let menuItems:JSX.Element[] = [];
        if (algorithms) {
            algorithms.forEach((algorithm) => {
                let item = (
                    <MenuItem
                        value={algorithm}
                        key={algorithm.id}
                        primaryText={algorithm.getAlgName()}
                    />
                );

                menuItems.push(item);
            })
        }
        return menuItems;
    }


    render() {
        let algorithmChooser = this.props.algorithmChooser;
        let algorithm = algorithmChooser && algorithmChooser.algorithm;

        return (
            <SelectField fullWidth={true}
                         floatingLabelText="Выберите алгоритм сортировки"
                         value={algorithm}
                         onChange={(event, index, value) => algorithmChooser && algorithmChooser.choose(value)}>
                <MenuItem
                    key={'null'}
                    value={null}
                    primaryText={' '}
                />
                {this._createAlgorithmChooserItems()}
            </SelectField>
        );
    }
}