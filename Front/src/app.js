import React from 'react';
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux'
import Route from "react-router-dom/es/Route";
import {BrowserRouter} from "react-router-dom";


const store = configureStore();
//Create action generators
//Create default states for reducers
//Create reducers

const App = (
    <Provider store={store}>
        <BrowserRouter>
            <Route component={AppRouter}/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(App, document.getElementById('app'));
