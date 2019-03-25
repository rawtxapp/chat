export default class ChatBackend {
  endpoint: string;
  constructor() {
    if (
      process.env.NODE_ENV &&
      process.env.NODE_ENV === "development" &&
      false
    ) {
      this.endpoint = "http://localhost:8080";
    } else {
      this.endpoint = "http://chat-backend.rawtx.com:9090";
    }
  }

  url = path => {
    return this.endpoint + "/" + path;
  };

  getInvoice = async (memo:string) => {
    const response = await fetch(this.url("invoice/" + memo));
    return response.json();
  };

  getUri = async () => {
    const response = await fetch(this.url("pubkey"));
    const json = await response.json();
    return json["uri"];
  };
}
