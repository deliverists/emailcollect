import { Auth as OnlineAuth } from 'aws-amplify'
import { Auth as OfflineAuth } from './offline-auth'
import apiCallCatchWrapper from './call-catch-wrapper'

const Auth = process.env.REACT_APP_OFFLINE ? OfflineAuth : OnlineAuth

export default class UserApi {
  hasCurrentSession = async () => {
    return apiCallCatchWrapper(async () => Auth.currentSession())
  }

  signIn = async (email, password) => {
    return apiCallCatchWrapper(async () => await Auth.signIn(email, password))
  }

  signOut = async () => {
    return apiCallCatchWrapper(async () => await Auth.signOut())
  }

  signUp = async (email, password) => {
    return apiCallCatchWrapper(async () => await Auth.signUp({ username: email, password }))
  }

  confirmSignUp = async (email, confirmationCode) => {
    return apiCallCatchWrapper(async () => await Auth.confirmSignUp(email, confirmationCode))
  }
}
