import React from "react";
import { View, StyleSheet } from "react-native";
import { Router, Switch, Route } from './Routing';

import Navbar from './components/Navbar';

import Home from './components/Home';
import SignIn from './components/user/Signin';
import SignUp from './components/user/Signup';
import Emails from './components/Emails';

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
                <Route path="/signin" render={(routeProps) => (
                    <SignIn {...routeProps} userStore={userStore} />
                  )}
                />
                <Route path="/signup" render={(routeProps) => (
                    <SignUp {...routeProps} userStore={userStore} />
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
