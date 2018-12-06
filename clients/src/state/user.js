import { action, decorate, observable } from "mobx"

class User {
  signedIn = false;
  hasSignedIn() {
    this.signedIn = true;
  }
  hasSignedOut() {
    this.signedIn = false;
  }
};

decorate(User, {
  signedIn: observable,
  hasSignedIn: action,
  hasSignedOut: action,
});

export default User;
