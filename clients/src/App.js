import React from 'react'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router'
import { Router, Switch, Route } from './routing/Components'
import history from './routing/history'

import Navbar from './components/Navbar'

import Home from './components/Home'
import SignIn from './components/user/SignIn'
import SignUp from './components/user/SignUp'
import VerifySignUp from './components/user/VerifySignUp'
import Emails from './components/Emails'
import Sites from './components/site/sites'
import Register from './components/site/register'

export default ({ userStore, sitesStore }) => {
  const RegisterWithRouter = withRouter(Register)
  return (
    <Router history={history}>
      <View style={styles.app}>
          <Navbar userStore={userStore} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/emails" render={(routeProps) => (
                    <Emails {...routeProps} userStore={userStore} />
                  )}
                />
                <Route path="/sites/register" render={(routeProps) => (
                    <RegisterWithRouter sitesStore={sitesStore} />
                  )}
                />
                <Route path="/sites" render={(routeProps) => (
                    <Sites {...routeProps} sitesStore={sitesStore} />
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
                <Route path="/verify" render={(routeProps) => (
                    <VerifySignUp {...routeProps} userStore={userStore} />
                  )}
                />
            </Switch>
        </View>
      </Router>
  )
}

const styles = StyleSheet.create({
    app: {
        flex: 1
    }
})
