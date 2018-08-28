export default class Micro {
  constructor() {
    this.allowance = 0;
  }

  init() {
    document.addEventListener("message", ({ data: rawData }) => {
      if (!rawData) return;
      let data = rawData.toLowerCase();
      const appAllowancePrefix = "appallowance:";
      if (data == "initmicro") {
        this.initialized = true;
        window.postMessage("initmicroack");
      } else if (data.startsWith(appAllowancePrefix)) {
        let newAllowance = data.substring(appAllowancePrefix.length);
        this.allowance = parseInt(newAllowance);
      }
    });
  }

  canHandleWithMicro = amount => {
    if (this.initialized && this.allowance > amount) {
      return true;
    }
    return false;
  };

  handleWithMicro = (invoice, amount) => {
    if (this.canHandleWithMicro(amount)) {
      window.postMessage("lightning:" + invoice);
      return true;
    }
    return false;
  };
}
