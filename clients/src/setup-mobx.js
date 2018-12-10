import { configure } from "mobx"
import userFactory from './state/user'

configure({enforceActions: 'observed'})

export const userStore = userFactory()
