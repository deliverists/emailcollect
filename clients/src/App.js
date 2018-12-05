import React from "react";
import { View, StyleSheet } from "react-native";
import { Router, Switch, Route } from './Routing';

import Home from './components/Home';
import Login from './components/Login';

export default () => {
  return (
    <View style={styles.app}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    </View>
  );
};

const styles = StyleSheet.create({
    app: {
        flex: 1
    }
});
