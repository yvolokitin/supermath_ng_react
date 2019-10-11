import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import './fonts/Grinched2.0.ttf'
import SMMainPage from './SMMainPage';

ReactDOM.render(<SMMainPage />, document.getElementById('supermath_app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
