import React from 'react';
import { StatusBar} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './src/store/reducer';
import Game from './src/screens/Game';

const store = createStore(reducer);
const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="light-content"/>
                <Provider store={store}>
                    <Game/>
                </Provider>
        </>
    );
};
export default App;
