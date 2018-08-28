import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import generateName from "sillyname";
import ChatBackend from "./ChatBackend";
import QRCode from "qrcode.react";

import "./App.css";
import Micro from "./Micro";

const config = {
  apiKey: "AIzaSyAwgkFy3Ywl1lwHZ2w2WAZc1VUjHMLDNxg",
  authDomain: "rawtxapp-b78be.firebaseapp.com",
  databaseURL: "https://rawtxapp-b78be.firebaseio.com",
  projectId: "rawtxapp-b78be",
  storageBucket: "rawtxapp-b78be.appspot.com",
  messagingSenderId: "99752098768"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const messagesRef = db.collection("messages");

let moniker;
if (localStorage && localStorage.getItem("chatMoniker")) {
  moniker = localStorage.getItem("chatMoniker");
} else {
  moniker = generateName();
  localStorage.setItem("chatMoniker", moniker);
}

const backend = new ChatBackend();
const micro = new Micro();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  componentDidMount() {
    messagesRef
      .orderBy("created_time", "desc")
      .limit(100)
      .onSnapshot(m => {
        this.setState({ messages: m.docs.reverse().map(d => d.data()) });
      });
    this._getUri();
    micro.init();
  }

  _getUri = async () => {
    const uri = await backend.getUri();
    this.setState({ uri });
  };

  _handleAddMessage = async e => {
    e.preventDefault();
    const memo = this.state.message.substr(0, 100);
    if (memo.trim() == "") {
      return;
    }
    let invoice = "";
    try {
      invoice = await backend.getInvoice(memo);
    } catch (err) {
      console.error(err);
      return;
    }

    messagesRef
      .add({
        created_time: Date.now(),
        invoice: invoice.pay_req,
        message: this.state.message,
        nickname: moniker,
        settled: false,
        withMicro: micro.canHandleWithMicro(100)
      })
      .then(() => {
        // in theory it would be nice to call handleWithMicro before adding it
        // since it would happen in parallel, but the problem is lightning
        // payments can be faster than inserting into firebase db, so what ends
        // up happening is that the backend detects successful payments, tries
        // to update firebase that it's paid, but the entry isn't written yet.
        // this could/should be solved with infra change, for now, this okay.
        micro.handleWithMicro(invoice.pay_req, 100);
      });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-moniker">Your nickname is: {moniker}</div>
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
            <div className="App-message-entry">
              <input
                type="text"
                value={this.state.message}
                onChange={event =>
                  this.setState({ message: event.target.value })
                }
                placeholder="Message..."
              />
            </div>
            <div className="App-submit-button">
              <input type="submit" value="Send message" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
