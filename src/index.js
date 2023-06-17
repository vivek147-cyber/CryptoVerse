import React from 'react';
import  * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';

import store from './app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
<Router >
    <Provider store={store}>
    <App />
    </Provider>
</Router>);