(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,t,n){e.exports=n(89)},47:function(e,t,n){},75:function(e,t){},88:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(35),r=n.n(i),o=(n(47),n(39)),c=n(1),l=n.n(c),u=n(5),m=n(4),d=n(10),h=n(40),f=n(36),p=n(41),g=n(37),v=n.n(g),w=n(38),E=n.n(w),b=n(17),k=n.n(b),N=(n(88),function(){function e(){var t=this;Object(m.a)(this,e),this.allowance=0,this.initialized=!1,this.canHandleWithMicro=function(e){return!!(t.initialized&&t.allowance>e)},this.handleWithMicro=function(e,n){return!!t.canHandleWithMicro(n)&&(window.postMessage("lightning:"+e,"*"),!0)}}return Object(d.a)(e,[{key:"init",value:function(){var e=this;document.addEventListener("message",function(t){var n=t.data;if(n){var a=n.toLowerCase();if("initmicro"==a)e.initialized=!0,window.postMessage("initmicroack","*");else if(a.startsWith("appallowance:")){var s=a.substring("appallowance:".length);e.allowance=parseInt(s)}}})}}]),e}()),y="";localStorage&&localStorage.getItem("chatMoniker")?y=localStorage.getItem("chatMoniker")||"":(y=v()(),localStorage.setItem("chatMoniker",y));var M=new function e(){var t=this;Object(m.a)(this,e),this.endpoint=void 0,this.socket=void 0,this.url=function(e){return t.endpoint+"/"+e},this.getInvoice=function(){var e=Object(u.a)(l.a.mark(function e(n){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url("invoice/"+n));case 2:return a=e.sent,e.abrupt("return",a.json());case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),this.onUpdateBoltheadCounter=function(e){t.socket.on("updateBoltheadCounter",e)},this.onSatoshiCounter=function(e){t.socket.on("satoshiCounter",e)},this.onNewMessage=function(e){t.socket.on("newMessage",e)},this.onInitialMessages=function(e){t.socket.on("initialMessages",e)},this.onSettled=function(e){t.socket.on("settled",e)},this.onNodeAddress=function(e){t.socket.on("nodeAddress",e)},this.newMessage=function(e){t.socket.emit("newMessage",e)},this.getUri=Object(u.a)(l.a.mark(function e(){var n,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url("pubkey"));case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,e.abrupt("return",a.uri);case 7:case"end":return e.stop()}},e)})),this.endpoint="https://chat-backend.rawtx.com",this.socket=E()(this.endpoint)},x=new N,S=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))};S(),window.addEventListener("resize",S);var j=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e)))._handleAddMessage=function(){var e=Object(u.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),M.newMessage({id:-1,nickname:y,settled:!1,message:n.state.message,invoice:"",withMicro:!1}),n.setState({message:""});case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.state={message:"",messages:[]},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;M.onUpdateBoltheadCounter(function(t){return e.setState({boltheadCounter:t})}),M.onNewMessage(function(t){return e.setState({messages:[].concat(Object(o.a)(e.state.messages),[t])})}),M.onInitialMessages(function(t){return e.setState({messages:t})}),M.onNodeAddress(function(t){return e.setState({uri:t})}),M.onSettled(function(t){if(t){var n=e.state.messages,a=!0,s=!1,i=void 0;try{for(var r,o=n[Symbol.iterator]();!(a=(r=o.next()).done);a=!0){var c=r.value;if(c.id==t){c.settled=!0;break}}}catch(l){s=!0,i=l}finally{try{a||null==o.return||o.return()}finally{if(s)throw i}}e.setState({messages:n})}}),M.onSatoshiCounter(function(t){return e.setState({satoshiCounter:t})}),x.init()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"App-container"},s.a.createElement("div",{className:"App-moniker pa3 sans-serif"},s.a.createElement("span",{className:"f3 sans-serif logo-text b"},"rawtx chat"),s.a.createElement("span",{className:"logo-text f4 pl2"},"- lightning enabled chat app."),s.a.createElement("span",{className:"slogan-text f4 pt2 pl2 b"},"10 satoshis per message."),s.a.createElement("div",{className:"slogan-text f4 pt2"},"Your nickname is: ",y),s.a.createElement("div",{className:"counter ma1 mt2 pa1 pb0 ml0"},s.a.createElement("div",{className:"dot"}),s.a.createElement("div",{className:"ml2 logo-text f4 b"},this.state.boltheadCounter||0," boltheads online right now")),s.a.createElement("div",{className:"counter pa1 ml0"},s.a.createElement("div",{className:"dot green-dot"}),s.a.createElement("div",{className:"ml2 logo-text f4 b green-text"},this.state.satoshiCounter||0," satoshis spent"))),s.a.createElement("div",{className:"App-messages"},s.a.createElement("div",null,this.state.messages&&this.state.messages.map(function(t,n){return s.a.createElement("p",{key:n},s.a.createElement("div",null,s.a.createElement("b",null,t.nickname)),s.a.createElement("div",{className:"pa3 ma1 ml0 mr0 br4 message-container"},t.settled?t.message:s.a.createElement("i",null,"Awaiting payment..."),t.nickname!=y||t.settled||t.withMicro?"":s.a.createElement("span",null,s.a.createElement("br",null),s.a.createElement("div",{className:"mt2"},s.a.createElement("b",null,"Your payment request")),s.a.createElement(k.a,{value:t.invoice,size:256}),s.a.createElement("br",null),s.a.createElement("div",{className:"mv1"},s.a.createElement("a",{href:"lightning:"+t.invoice,className:"link"},t.invoice)),s.a.createElement("br",null),s.a.createElement("b",null,"rawtx chat node's address"),s.a.createElement("br",null),s.a.createElement(k.a,{value:e.state.uri||""}),s.a.createElement("div",null,e.state.uri)),t.nickname==y&&t.withMicro&&!t.settled?s.a.createElement("span",null,s.a.createElement("br",null),"Settling payment with micro"):""))})))),s.a.createElement("div",{className:"form-container"},s.a.createElement("form",{onSubmit:this._handleAddMessage},s.a.createElement("div",{className:"message-form"},s.a.createElement("div",{className:"App-message-entry"},s.a.createElement("input",{type:"text",value:this.state.message,onChange:function(t){return e.setState({message:t.target.value})},placeholder:"Message...",className:"pa3 ma2 w-100"})),s.a.createElement("div",{className:"App-submit-button ma3"},s.a.createElement("input",{type:"submit",value:"Send"}))))))}}]),t}(a.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(s.a.createElement(j,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");C?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):A(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):A(e)})}}()}},[[42,1,2]]]);
//# sourceMappingURL=main.e376f0d3.chunk.js.map