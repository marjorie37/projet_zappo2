import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//PROVIDER FOR USER DATA 
import ZappoProvider from './ZappoProvider';

//ROUTES FIRST LEVEL
import routes from '../routes';


class App extends Component {

    render() {

        return (
            <div>
                {routes()}
            </div>
            
        );
    }
}


export default hot(module)(ZappoProvider(App));