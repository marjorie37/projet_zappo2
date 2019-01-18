import React from 'react';
import ReactDOM from 'react-dom';

import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './material/theme';
import './assets/css/index.css';


//  router
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';



if(module.hot) module.hot.accept();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
    </MuiThemeProvider>
        ,

    document.getElementById('root')
);
