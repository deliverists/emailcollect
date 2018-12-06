import React from "react";
import HybridApp from "./src/App";

import './src/setup-amplify';
import { userStore } from './src/setup-mobx';

export default class NativeApp extends React.Component {

  render() {
      return <HybridApp userStore={userStore} />;
  }
}