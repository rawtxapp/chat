import React, { Component } from "react";
import generateName from "sillyname";
import ChatBackend from "./ChatBackend";
import QRCode from "qrcode.react";

import "./App.css";
import Micro from "./Micro";
import Message from "./Message";

let moniker = "";
if (localStorage && localStorage.getItem("chatMoniker")) {
  moniker = localStorage.getItem("chatMoniker") || "";
} else {
  moniker = generateName();
  localStorage.setItem("chatMoniker", moniker);
}

const backend = new ChatBackend();
const micro = new Micro();

export interface Props {

}

interface State {
  message: string;
  uri?: string;
  messages: Message[];
  boltheadCounter?: number;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { message: "", messages: [] };
  }

  componentDidMount() {
    // this._getUri();
    backend.onUpdateBoltheadCounter((c) => this.setState({ boltheadCounter: c }));
    backend.onNewMessage((msg: Message) =>
      this.setState({ messages: [...this.state.messages, msg] }));
    micro.init();
  }

  _getUri = async () => {
    const uri = await backend.getUri();
    this.setState({ uri });
  };

  _handleAddMessage = async e => {
    e.preventDefault();
    backend.newMessage({ 
      nickname: moniker,
      settled: false,
      message: this.state.message,
      invoice: "",
      withMicro: false
    });
    // const memo = this.state.message.substr(0, 100);
    // if (memo.trim() == "") {
    //   return;
    // }
    // let invoice = "";
    // try {
    //   invoice = await backend.getInvoice(memo);
    // } catch (err) {
    //   console.error(err);
    //   return;
    // }

    // this.setState({ message: "" });
  };

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-moniker pa3 sans-serif">
            <span className="f3 sans-serif logo-text b">rawtx chat</span>
            <span className="logo-text f4 pl2">
              - lightning enabled chat app.
            </span>
            <span className="slogan-text f4 pt2 pl2 b">
              10 satoshis per message.
            </span>
            <div className="slogan-text f4 pt2">
              Your nickname is: {moniker}
            </div>
            <div className="counter ma1 mt2 pa1 pb0 ml0">
              <div className="dot"></div>
              <div className="ml2 logo-text f4 b">
                {this.state.boltheadCounter || 0} boltheads online right now
              </div>
            </div>
            <div className="counter pa1 ml0">
              <div className="dot green-dot"></div>
              <div className="ml2 logo-text f4 b green-text">0 satoshis spent</div>
            </div>
          </div>
          <div className="App-messages">
            <div>
              {this.state.messages &&
                this.state.messages.map((m, i) => (
                  <p key={i}>
                    <b>{m.nickname}: </b>
                    {m.settled ? m.message : <i>Awaiting payment</i>}
                    {m.nickname == moniker && !m.settled && !m.withMicro ? (
                      <span>
                        <br />
                        <b>Your payment request:</b>
                        <br />
                        <a href={"lightning:" + m.invoice}>{m.invoice}</a>
                        <br />
                        <QRCode value={m.invoice} size={256} />
                        <br />
                        <b>The node's address is:</b>
                        <br />
                        {this.state.uri}
                        <br />
                        <QRCode value={this.state.uri || ""} />
                      </span>
                    ) : (
                        ""
                      )}
                    {m.nickname == moniker && m.withMicro && !m.settled ? (
                      <span>
                        <br />
                        Settling payment with micro
                      </span>
                    ) : (
                        ""
                      )}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={this._handleAddMessage}>
            <div className="message-form">
              <div className="App-message-entry">
                <input
                  type="text"
                  value={this.state.message}
                  onChange={event =>
                    this.setState({ message: event.target.value })
                  }
                  placeholder="Message..."
                  className="pa3 ma2 w-100"
                />
              </div>
              <div className="App-submit-button ma3">
                <input type="submit" value="Send" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
