import { Auth } from "aws-amplify"

const apiCallCatchWrapper = async func => {
  try {
    const result = await func()
    return { success: true, result }
  }
  catch (e) {
    return { success: false, message: typeof e === 'string' ? e : e.message }
  }
}

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
