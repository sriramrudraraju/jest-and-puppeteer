import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
