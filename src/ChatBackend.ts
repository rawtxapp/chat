import io from 'socket.io-client';
import Message from './Message';

export default class ChatBackend {
  endpoint: string;
  socket: SocketIOClient.Socket;
  constructor() {
    if (
      process.env.NODE_ENV &&
      process.env.NODE_ENV === "development"
    ) {
      this.endpoint = "http://localhost:3001";
    } else {
      this.endpoint = "https://chat-backend.rawtx.com:9090";
    }
    this.socket = io(this.endpoint);
  }

  url = path => {
    return this.endpoint + "/" + path;
  };

  getInvoice = async (memo:string) => {
    const response = await fetch(this.url("invoice/" + memo));
    return response.json();
  };

  onUpdateBoltheadCounter = (fn: Function) => {
    this.socket.on('updateBoltheadCounter', fn);
  }

  onNewMessage = (fn:Function) => {
    this.socket.on('newMessage', fn);
  }

  newMessage = (msg: Message) => {
    this.socket.emit('newMessage', msg);
  }

  getUri = async () => {
    const response = await fetch(this.url("pubkey"));
    const json = await response.json();
    return json["uri"];
  };
}
