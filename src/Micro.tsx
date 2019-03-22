export default class Micro {
  allowance : number = 0;
  initialized : boolean = false;

  init() {
    document.addEventListener("message", ({ data: rawData }:any) => {
      if (!rawData) return;
      let data = rawData.toLowerCase();
      const appAllowancePrefix = "appallowance:";
      if (data == "initmicro") {
        this.initialized = true;
        window.postMessage("initmicroack", "*");
      } else if (data.startsWith(appAllowancePrefix)) {
        let newAllowance = data.substring(appAllowancePrefix.length);
        this.allowance = parseInt(newAllowance);
      }
    });
  };

  canHandleWithMicro = (amount: number) => {
    if (this.initialized && this.allowance > amount) {
      return true;
    }
    return false;
  };

  handleWithMicro = (invoice: string, amount: number) => {
    if (this.canHandleWithMicro(amount)) {
      window.postMessage("lightning:" + invoice, "*");
      return true;
    }
    return false;
  };
}
