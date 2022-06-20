import React from "react";
import ReactDOM from "react-dom";
import init from "./editor";

import "./styles.css";

function App() {
    return (
        <div className="App">
            <div style={{ width: "100vw", height: "100vh" }}>
                <div ref={el => init(el)} />
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
