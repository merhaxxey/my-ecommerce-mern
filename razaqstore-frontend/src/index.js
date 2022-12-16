import ReactDom from 'react-dom'
import React from 'react'
import App from './App.js'
// import {StateProvider} from './StateProvider'
// import {initialState, reducer} from './reducer'
import {Provider} from 'react-redux'
import {store} from './store'

ReactDom.render(
    <React.StrictMode>
        <Provider store={store} >
            <App/>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
)

