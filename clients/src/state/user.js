import { action, decorate, observable } from "mobx"

class User {
  authenticated = false;
  authenticate() {
    this.authenticated = true;
  }
};

decorate(User, {
  authenticated: observable,
  authenticate: action,
});

export default User;
