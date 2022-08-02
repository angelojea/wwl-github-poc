import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";

import { initializeIcons } from '@fluentui/react';

import { AppContextProvider } from "./app.context";
import { App } from './app';

import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import '../node_modules/@fluentui/react/dist/css/fabric.min.css';
import '../node_modules/animate.css/animate.min.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';

initializeIcons();

ReactDOM.render(
    <AppContextProvider>
        <Router>
            <App />
        </Router>
    </AppContextProvider>
    , document.getElementById('aoj-app-container'));
