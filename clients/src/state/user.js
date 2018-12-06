import { action, decorate, observable } from "mobx"

class User {
  authenticated = false;
  hasAuthenticated() {
    this.authenticated = true;
  }
  hasSignedOut() {
    this.authenticated = false;
  }
};

decorate(User, {
  authenticated: observable,
  hasAuthenticated: action,
  hasSignedOut: action,
});

export default User;
