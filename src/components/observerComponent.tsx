import * as React from "react";

export abstract class ObserverComponent<P, S> extends React.Component<P, S> {

    // componentWillReact() {
    //     console.log(`Component ${this.getName()} will re-render`);
    // }

    abstract getName(): string;

    protected willMount() {
    }

    protected initStores() {
    }

    private componentWillMount() {
        this.initStores();
        this.willMount();
    };

    protected didMount() {
    }

    private componentDidMount() {
        this.didMount();
    };

    didUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any) {

    }

    private componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any) {
        this.didUpdate(prevProps, prevState, prevContext);
    };

    private componentWillUnmount() {

    };

    render(): JSX.Element | null {
        return (
            null
        );
    }
}