import * as React from "react";
import {HTMLProps} from "react";

export function FullDiv(props: HTMLProps<HTMLDivElement>) {
    return (
        <div {...props} style={{height: "100%", flex: "1 1"}}>
            {props.children}
        </div>
    )
}