import React from "react";
import { View, StyleSheet } from "react-native";
import { Router, Switch, Route } from './Routing';

import Home from './components/Home';
import Login from './components/Login';
import Emails from './components/Emails';

export default ({ userStore }) => {
  return (
    <View style={styles.app}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/emails" render={(routeProps) => (
                    <Emails {...routeProps} userStore={userStore} />
                  )}
                />
                <Route path="/login" render={(routeProps) => (
                    <Login {...routeProps} userStore={userStore} />
                  )}
                />
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
