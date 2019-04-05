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

const updateVh = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

updateVh();
window.addEventListener('resize', updateVh);

export interface Props {

}

interface State {
  message: string;
  uri?: string;
  messages: Message[];
  boltheadCounter?: number;
  satoshiCounter?: number;
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
    backend.onInitialMessages((msg: Message[]) => this.setState({ messages: msg }));
    backend.onNodeAddress((u) => this.setState({ uri: u }));
    backend.onSettled((id: number) => {
      if (!id) return;
      const msgs = this.state.messages;
      for (let i of msgs) {
        if (i.id == id) {
          i.settled = true;
          break;
        }
      }
      this.setState({ messages: msgs });
    })
    backend.onSatoshiCounter((c) => this.setState({ satoshiCounter: c }))
    micro.init();
  }

  _handleAddMessage = async e => {
    e.preventDefault();
    backend.newMessage({
      id: -1, // doesn't matter, backend will set it.
      nickname: moniker,
      settled: false,
      message: this.state.message,
      invoice: "",
      withMicro: false
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-moniker pa3-l pa2 sans-serif">
            <span className="f3-l f4-m f5 sans-serif logo-text b">rawtx chat</span>
            <span className="logo-text f4-l f5-m f6 pl2">
              - lightning enabled chat app.
            </span>
            <span className="slogan-text f4-l f5-m f6 pt2 pl2 b">
              10 satoshis per message (testnet).
            </span>
            <div className="slogan-text f4-l f5-m f6 pt2">
              Your nickname is: {moniker}
            </div>
            <div className="counter ma1 mt2 pa1 pb0 ml0">
              <div className="dot"></div>
              <div className="ml2 logo-text f4-l f5-m f6 b">
                {this.state.boltheadCounter || 0} boltheads online right now
              </div>
            </div>
            <div className="counter pa1 ml0">
              <div className="dot green-dot"></div>
              <div className="ml2 logo-text f4-l f5-m f6 b green-text">{this.state.satoshiCounter || 0} satoshis spent</div>
            </div>
          </div>
          <div className="App-messages pa2 pb0">
            <div>
              {this.state.messages &&
                this.state.messages.map((m, i) => (
                  <p key={i}>
                    <div className="f5-ns f6"><b>{m.nickname}</b></div>
                    <div className="pa3-l pa2 ma1 ml0 mr0 br4 message-container f5-l f6-m f7">
                      {m.settled ? m.message : <i>Awaiting payment...</i>}
                      {m.nickname == moniker && !m.settled && !m.withMicro ? (
                        <span>
                          <br />
                          <div className="mt2">
                            <b>Your payment request</b>
                          </div>
                          <QRCode value={m.invoice} size={256} />
                          <br />
                          <div className="mv1">
                            <a href={"lightning:" + m.invoice} className="link">{m.invoice}</a>
                          </div>
                          <br />
                          <b>rawtx chat node's address</b>
                          <br />
                          <QRCode value={this.state.uri || ""} />
                          <div>{this.state.uri}</div>
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
                    </div>
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="form-container">
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
                  className="pa3-l ma2-l w-100 f3-l pa2 ma1 f4"
                />
              </div>
              <div className="App-submit-button ma3-l f3-l ma2 f4">
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
