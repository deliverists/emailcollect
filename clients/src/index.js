import React from 'react';
import ReactDOM from 'react-dom';

import './setup-amplify';
import { userStore } from './setup-mobx';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App userStore={userStore} />
    , document.getElementById('root'));
registerServiceWorker();
