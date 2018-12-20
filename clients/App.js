import React from "react";
import HybridApp from "./src/App";

import setupAmplify from './src/setup-amplify';
import { userStore, sitesStore } from './src/setup-mobx';

setupAmplify()

export default class NativeApp extends React.Component {
  render() {
      return <HybridApp userStore={userStore} sitesStore={sitesStore} />;
  }
}
