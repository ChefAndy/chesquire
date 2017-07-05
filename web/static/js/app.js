import "phoenix_html"
import {Socket, Presence} from "phoenix"
// Socket
let user = document.getElementById("user").innerText
let socket = new Socket("/socket", {params: {user: user}})
socket.connect()

// Presence
let presences = {}

let formatTimestamp = (timestamp) => {
  let date = new Date(timestamp)
  return date.toLocaleTimeString()
}
let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formatTimestamp(metas[0].online_at)
  }
}

let userList = document.getElementById("UserList")
let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
      <li>
        <b>${presence.user}</b>
        <br><small>online since ${presence.onlineAt}</small>
      </li>
    `)
    .join("")
}

var is_case = false;
var room_name = "lobby";

if (document.getElementById("room")) {
  room_name = document.getElementById("room");
} else if (document.getElementById("case")){
  room_name = document.getElementById("case");
  is_case = true;
}

//Get Case
if (is_case) {

  let request = obj => {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open(obj.method || "GET", obj.url);
          if (obj.headers) {
              Object.keys(obj.headers).forEach(key => {
                  xhr.setRequestHeader(key, obj.headers[key]);
              });
          }
          xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                  resolve(xhr.response);
              } else {
                  reject(xhr.statusText);
              }
          };
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send(obj.body);
      });
  };

  let case_url = "http://library.law.harvard.edu/projects/32044038642120_redacted_CASEMETS_0003.xml"

  request({url: case_url})
      .then(data => {
        var oSerializer = new XMLSerializer();
        var sXML = oSerializer.serializeToString(data);
      })
      .catch(error => {
          console.log(error);
      });
}

// Channels
let room = socket.channel("room:"+room_name.innerText)
room.on("presence_state", state => {
  presences = Presence.syncState(presences, state);
  render(presences);
})

room.on("presence_diff", diff => {
  presences = Presence.syncDiff(presences, diff);
  render(presences);
})

room.join();

// Chat
let messageInput = document.getElementById("NewMessage")
messageInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 && messageInput.value != "") {
    room.push("message:new", messageInput.value);
    messageInput.value = ""
  }
})

let messageList = document.getElementById("MessageList")
let renderMessage = (message) => {
  let messageElement = document.createElement("li")
  messageElement.innerHTML = `
    <b>${message.user}</b>
    <i>${formatTimestamp(message.timestamp)}</i>
    <p>${message.body}</p>
  `
  messageList.appendChild(messageElement)
  messageList.scrollTop = messageList.scrollHeight;
}

room.on("message:new", message => renderMessage(message))
