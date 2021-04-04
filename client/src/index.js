//React entry point
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		{/* Provider will warp around our app and passing in store from store.js for gobal component state control */}
		<App />
	</Provider>,
	document.getElementById("root")
);
