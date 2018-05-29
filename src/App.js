import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import generateName from "sillyname";
import ChatBackend from "./ChatBackend";
import QRCode from "qrcode.react";

import "./App.css";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  componentDidMount() {
    messagesRef
      .orderBy("created_time")
      .limit(100)
      .onSnapshot(m => {
        this.setState({ messages: m.docs.map(d => d.data()) });
      });
    this._getUri();
  }

  _getUri = async () => {
    const uri = await backend.getUri();
    this.setState({ uri });
  };

  _handleAddMessage = async e => {
    e.preventDefault();
    const memo = this.state.message.substr(0, 100);
    let invoice = "";
    try {
      invoice = await backend.getInvoice(memo);
    } catch (err) {
      console.error(err);
      return;
    }
    messagesRef.add({
      created_time: Date.now(),
      invoice: invoice.pay_req,
      message: this.state.message,
      nickname: moniker,
      settled: false
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header-container">
          <header className="App-header">
            <h1 className="App-title">rawtx lightning chat (testnet)</h1>
          </header>
        </div>
        <div className="App-container">
          <div className="App-moniker">Your nickname is: {moniker}</div>
          <div className="App-messages">
            {this.state.messages &&
              this.state.messages.map((m, i) => (
                <p key={i}>
                  <b>{m.nickname}: </b>
                  {m.settled ? m.message : <i>Awaiting payment</i>}
                  {m.nickname == moniker ? (
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
                </p>
              ))}
          </div>
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
