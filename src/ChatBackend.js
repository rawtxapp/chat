export default class ChatBackend {
  constructor() {
    this.endpoint = "http://chat-backend.rawtx.com:9090";
  }

  url = path => {
    return this.endpoint + "/" + path;
  };

  getInvoice = async memo => {
    const response = await fetch(this.url("invoice/" + memo));
    return response.json();
  };
}
