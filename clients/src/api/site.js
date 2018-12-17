import { API } from "aws-amplify";
import apiCallCatchWrapper from './call-catch-wrapper'

export default class SiteApi {
  registerSite = async (site) => {
    return apiCallCatchWrapper(async () => await API.post('emailcollect', '/sites', {
      body: { site },
    }))
  }

  getRegisteredSites = async () => {
    return apiCallCatchWrapper(async () => await API.get('emailcollect', '/sites'))
  }
}
