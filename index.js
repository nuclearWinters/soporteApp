import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore } from "redux"
import { Provider } from "react-redux"
import React from "react"

reducer = (state, action) => state

const INITIAL_STATE = {count: 0}

const store = createStore(reducer, INITIAL_STATE)

const Appo = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Appo);
