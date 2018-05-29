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

  getUri = async () => {
    const response = await fetch(this.url("pubkey"));
    const json = await response.json();
    return json["uri"];
  };
}
