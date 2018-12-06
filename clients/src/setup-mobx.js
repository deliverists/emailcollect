import { Auth } from "aws-amplify";
import { configure } from "mobx"
import UserStore from './state/user';

configure({enforceActions: 'observed'})

export const userStore = new UserStore();

const initUserStore = async () => {
  try {
    await Auth.currentSession();
    userStore.hasAuthenticated();
  }
  catch(e) {
    console.log(e.message);
  }
};

initUserStore();
