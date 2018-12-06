import React from "react";
import { View, StyleSheet } from "react-native";
import { Router, Switch, Route } from './Routing';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Login';
import Emails from './components/Emails';
import Navbar from './components/Navbar';

export default ({ userStore }) => {
  return (
    <Router>
      <View style={styles.app}>
          <Navbar userStore={userStore} />
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
                <Route path="/signup" render={(routeProps) => (
                    <Signup {...routeProps} userStore={userStore} />
                  )}
                />
            </Switch>
        </View>
      </Router>
  );
};

const styles = StyleSheet.create({
    app: {
        flex: 1
    }
});
