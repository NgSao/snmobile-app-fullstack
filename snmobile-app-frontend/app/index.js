import React from 'react'
import StackNavigator from './navigation/StackNavigator'
import { Provider } from 'react-redux'
import Store from './redux/Store'
import BoxChat from './components/BoxChat';

export default function index() {
    return (
        <>
            <Provider store={Store}>
                <StackNavigator />
                <BoxChat />
            </Provider>
        </>
    )
}


