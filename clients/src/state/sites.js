import { runInAction, action, decorate, observable } from "mobx"
import SiteApi from '../api/site';

class Sites {
  constructor(api) {
    this.api = api;
  }

  loading = false
  error = null
  sites = []
  siteToRegister = ''

  async _apiAction (apiFunc) {
    runInAction(() => {
      this.loading = true
      this.error = null
    })
    const response = await apiFunc()
    runInAction(() => {
      this.loading = false
      this.error = response.message
    })
    return response
  }

  async updateSiteToRegister(site) {
    this.siteToRegister = site
  }

  async registerSite() {
    return this._apiAction(async () => this.api.registerSite(this.siteToRegister))
  }

  async getRegisteredSites(site) {
    const response = await this._apiAction(async () => this.api.getRegisteredSites())
    runInAction(() => this.sites = response.result.data.Items)
  }
};

decorate(Sites, {
  siteToRegister: observable,
  loading: observable,
  error: observable,
  sites: observable,
  updateSiteToRegister: action,
});

const siteFactory = () => new Sites(new SiteApi())

export default siteFactory;
