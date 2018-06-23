export default class Micro {
  init() {
    document.addEventListener("message", ({ data }) => {
      if (data == "initMicro") {
        this.initialized = true;
        window.postMessage("initMicroAck");
      }
    });
  }
}
