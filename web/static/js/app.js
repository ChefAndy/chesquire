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

//Get Case
if (document.getElementById("case_display")) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         document.getElementById("case_display").innerHTML = xhttp.responseText;
      }
  };
  xhttp.open("GET", document.getElementById("case_display").getAttribute("data-case-url"), true);
  xhttp.send();

}

// Channels
let room = socket.channel("room:"+document.getElementById("room").innerText)
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
