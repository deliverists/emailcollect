import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import {configure} from "mobx"

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';
import UserStore from './state/user';

configure({enforceActions: true})

const userStore = new UserStore();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "emails",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
    <App userStore={userStore} />
    , document.getElementById('root'));
registerServiceWorker();
