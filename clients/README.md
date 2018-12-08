# Email Swan Clients

## Introduction

Taken from the repo: https://github.com/joefazz/react-native-web-starter which was built from the article: https://medium.com/@yannickdot/write-once-run-anywhere-with-create-react-native-app-and-react-native-web-ad40db63eed0

This attempts to share code between a web and a react native client to produce a web, ios and android app.

## Scripts

It is built from an integration between create-react-app and create-react-native-app (that uses Expo.)

| Script              | Action                                                  |
| ------------------- | ------------------------------------------------------- |
| `yarn web`          | Start CRA Development Build                             |
| `yarn build-web`    | Create production build for web                         |
| `yarn eject-web`    | Eject from CRA                                          |
| `yarn start-native` | Start the Expo packager                                 |
| `yarn eject-native` | Eject from Expo                                         |
| `yarn android`      | Start expo packager and install app to Android Emulator |
| `yarn ios`          | Start expo packager and install app to iOS Simulator    |
| `yarn test-native`  | Run testing script for mobile app                       |
| `yarn test-web`     | Run testing script for web app                          |
| `yarn test`         | Run both testing scripts                                |

## Todo:

 * architecture:
   * Get testing working!
   * Get eslint rules working!
   * Get packages updated and on 1 lock file (yarn pref)
   * check if we can use hooks yet to get rid of the class
   * check mobx best practices
 * clean up
   * update to react native that bundles react 16.2 and use fragments in place of some pointless views
   * sort Warning: Invalid value for prop `component` on <a> tag
 * make screens pretty :)
   * choose styling library
   * move links into a navbar
 * sign in:
   * make confirmation (email verification) work from a link on the email
   * output current username in SignedInInfo component from aws-amplify.Auth.currentAuthenticatedUser()
   * add forgotten password functionality
   * make "signedin" a hoc that signin and signup use?
   * add spinners on loading/ signing in attributes

 * build the basic scenarios - i.e.:
 
     2. registering a website (and this updating the whitelist)
     3. customer being able to view the signups (up to 100 emails)
     4. customer paying for premium access and being able to view all the signups

 * tasks left for scenario 2:

  1. make a "register a site screen"
  2. add a dynamo table for the whitelist
  2. make a "register site api"
  ......
