import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './stores'
import { Provider } from 'react-redux';
import { Home } from './components/layout';

const app = (
    <Provider store={store.initialize()}>
        <div>
            <Home />
        </div>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));