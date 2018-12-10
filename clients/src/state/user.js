import { runInAction, decorate, observable, computed } from "mobx"
import UserApi from '../api/user';

export const userStates = {
  SIGNED_OUT: 'signed out',
  SIGNED_IN: 'signed in',
  SIGNING_IN: 'signing in',
  SIGNING_OUT: 'signing out',
  SIGNING_UP: 'signing up',
  UNVERIFIED: 'unverified',
  VERIFYING_SIGN_UP: 'verifying sign up',
}


class User {
  constructor(api) {
    this.api = api;
  }

  state = userStates.SIGNED_OUT
  error = null

  async _apiAction (requestingState, successState, failureState, apiFunc) {
    runInAction(() => {
      this.state = requestingState
      this.error = null
    })
    const result = await apiFunc()
    runInAction(() => {
      this.state = result.success ? successState : failureState
      this.error = result.message
    })
    return result
  }

  async init() {
    const hasSession = await this.api.hasCurrentSession();
    runInAction(() => this.state = hasSession.success ? userStates.SIGNED_IN : userStates.SIGNED_OUT)
  }

  get signedIn() {
    return this.state === userStates.SIGNED_IN;
  }

  get awaitingVerification() {
    return this.state === userStates.UNVERIFIED;
  }

  async signIn(email, password) {
    return this._apiAction(
      userStates.SIGNING_IN,
      userStates.SIGNED_IN,
      userStates.SIGNED_OUT,
      async () => this.api.signIn(email, password),
    )
  }

  async signOut() {
    return this._apiAction(
      userStates.SIGNING_OUT,
      userStates.SIGNED_OUT,
      userStates.SIGNED_IN,
      async () => this.api.signOut(),
    )
  }

  async signUp(email, password) {
    return this._apiAction(
      userStates.SIGNING_UP,
      userStates.UNVERIFIED,
      userStates.SIGNED_OUT,
      async () => this.api.signUp(email, password),
    )
  }

  async confirmSignUp(email, confirmationCode) {
    return this._apiAction(
      userStates.VERIFYING_SIGN_UP,
      userStates.SIGNING_UP,
      userStates.UNVERIFIED,
      async () => this.api.confirmSignUp(email, confirmationCode),
    )
  }
}

decorate(User, {
  state: observable,
  error: observable,
  signedIn: computed,
  awaitingVerification: computed,
})

const userFactory = () => {
  const user = new User(new UserApi());
  user.init();
  return user;
}

export default userFactory;
