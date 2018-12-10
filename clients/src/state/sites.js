import { decorate, observable } from "mobx"

class Sites {
  loading = false;
};

decorate(Sites, {
  loading: observable,
});

export default Sites;
