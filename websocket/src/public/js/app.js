const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nick");

const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

//메시지받은 경우
socket.addEventListener("message", async (message) => {
  if (typeof message.data === "string") {
    console.log(`New message :`, message.data);

    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
  } else {
    const messageText = await message.data.text();
    console.log(messageText);
  }
});

//메시지보낸 경우
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // socket.send(input.value);
  // json타입으로
  socket.send(makeMessage("new_message", input.value));

  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.append(li);

  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  // socket.send(input.value);
  // json타입으로
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);

nicknameForm.addEventListener("submit", handleNickSubmit);
