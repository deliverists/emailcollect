import {configure} from "mobx"
import UserStore from './state/user';

configure({enforceActions: 'observed'})

export const userStore = new UserStore();
