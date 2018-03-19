import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, StatelessComponent} from "react";

export const FullDiv: StatelessComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> =
    ({children, ...props}) => {
        return (
            <div {...props} style={{height: "100%", flex: "1 1"}}>
                {children}
            </div>
        )
    }