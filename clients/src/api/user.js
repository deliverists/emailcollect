import { Auth } from 'aws-amplify'
import apiCallCatchWrapper from './call-catch-wrapper'

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
