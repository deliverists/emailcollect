import { configure } from "mobx"
import userFactory from './state/user'
import siteFactory from './state/sites'

configure({enforceActions: 'observed'})

export const userStore = userFactory()
export const sitesStore = siteFactory()
sitesStore.getRegisteredSites()
