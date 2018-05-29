export default class ChatBackend {
  constructor() {
    this.endpoint = "https://chat-backend.rawtx.com";
  }

  url = path => {
    return this.endpoint + "/" + path;
  };

  getInvoice = async memo => {
    const response = await fetch(this.url("invoice/" + memo));
    return response.json();
  };
}
