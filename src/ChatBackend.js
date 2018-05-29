export default class ChatBackend {
  constructor() {
    this.endpoint = "http://localhost:8080";
  }

  url = path => {
    return this.endpoint + "/" + path;
  };

  getInvoice = async memo => {
    const response = await fetch(this.url("invoice/" + memo));
    return response.json();
  };
}
