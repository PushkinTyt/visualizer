import * as React from "react";
import {Component} from "react";
import Paper from "material-ui/Paper";
import {inject, observer} from "mobx-react";
import {AlgorithmChooserStore} from "../../stores/algorithmChooserStore";
import {MenuItem, SelectField} from "material-ui";
import {computed} from "mobx";
import {AbstractView} from "../../algorithms/abstractView";

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


    render() {
        let algorithmChooser = this.props.algorithmChooser;
        let viewId = algorithmChooser && algorithmChooser.viewId;

        return (
            <Paper zDepth={2} style={{margin: 10, padding: 10}}>
                <SelectField fullWidth={true}
                             floatingLabelText={'Язык'}
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
            </Paper>
        );
    }
}