declare module "react-perfect-scrollbar" {
    import * as React from "react";
    import CSSProperties = React.CSSProperties;
    interface PerfectScrollbarOption {
        scrollXMarginOffset?: number;
        suppressScrollX?: boolean;
    }
    interface PerfectScrollbarProps {
        option?: PerfectScrollbarOption;
        className?: string;
        style?: CSSProperties;
        onScrollY?: () => void;
        onScrollX?: () => void;
        onScrollUp?: () => void;
        onScrollDown?: () => void;
        onScrollLeft?: () => void;
        onScrollRight?: () => void;
        onYReachStart?: () => void;
        onYReachEnd?: () => void;
        onXReachStart?: () => void;
        onXReachEnd?: () => void;
    }
    class PerfectScrollbar extends React.Component<PerfectScrollbarProps, any> {
        new(props: PerfectScrollbarProps): PerfectScrollbar;
        _container?: HTMLElement;
        componentWillUnmount(): void;
        componentDidMount(): void;
        setScrollTop(top: number): boolean
        setScrollLeft(top: number): boolean
        render(): JSX.Element | null;
    }
    export = PerfectScrollbar;
}