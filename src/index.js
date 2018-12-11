import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { AppContainer } from 'react-hot-loader';
import "./global.scss";

import App from './containers/App';
const rootElement = document.getElementById('root');
render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    rootElement
);
