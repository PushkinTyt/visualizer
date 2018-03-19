import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app/app";
import injectTapEventPlugin = require("react-tap-event-plugin");

import "./importModules/importCSS";
import "./importModules/importJS";

function init() {
    injectTapEventPlugin();
    let entryDiv = document.createElement('div');
    entryDiv.style.height = "100%";
    entryDiv.style.width = "100%";
    entryDiv.style.position = "fixed";
    document.body.appendChild(entryDiv);
    ReactDOM.render(
        <App/> as any,
        entryDiv
    );
}

document.addEventListener("DOMContentLoaded", init);