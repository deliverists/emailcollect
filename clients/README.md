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
   * get iphone version working locally
   * test against android version on real phone
   * Get testing working!
   * Get eslint rules working!
   * Get packages updated and on 1 lock file (yarn pref)
   * check if we can use hooks yet to get rid of the class
   * check mobx best practices
 * make screens pretty :)
   * choose styling library
   * move links into a navbar
 * sign in:
   * make confirmation (email verification) work from a link on the email
   * make confirmation work from a new load of app in the verify screen (add email manually)
   * output current username in SignedInInfo component from aws-amplify.Auth.currentAuthenticatedUser()
   * add forgotten password functionality
   * make "signedin" a hoc that signin and signup use?
   * add spinners on loading/ signing in attributes
   * add sign in/ sign up/ verify validation info available to users
   * follow guidance here: https://www.chromium.org/developers/design-documents/create-amazing-password-forms
 * register site:
   * auth'd endpoint - check serverless -stack site for 1 way of doing this
 * code debt:
   * update to react native that bundles react 16.2 and use fragments in place of some pointless views
   * understand the touchableopacity component attribute on Link (removed because in web it created a prop warning for <a>)
   * bring in TypeScript
   * move all forms to controlled - all the ui state in mobx
   * ditch react router/navigation for mobx routing
   * 404 component
   * using bind in react component handlers - how get rid of this? - https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding

 * build the basic scenarios - i.e.:
 
     2. registering a website (and this updating the whitelist)
     3. customer being able to view the signups (up to 100 emails)
     4. customer paying for premium access and being able to view all the signups

 * tasks left for scenario 2:

  1. make a "register a site screen"
      client side validation
      respond to server side validation
      server side is allowing duplicates?
  2. add a dynamo table for the whitelist
  2. make a "register site api"
  3. add limits for number of sites a user can add
  4. add verification via domain/site scraping ala google web masters
  ......
