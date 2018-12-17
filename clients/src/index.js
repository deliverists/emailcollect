import React from 'react';
import ReactDOM from 'react-dom';

import './setup-amplify';
import { userStore, sitesStore } from './setup-mobx';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log('info', sitesStore)
ReactDOM.render(
    <App userStore={userStore} sitesStore={sitesStore} />
    , document.getElementById('root'));
registerServiceWorker();
