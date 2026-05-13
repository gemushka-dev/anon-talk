import { useEffect, useState } from "react";
import type { Message } from "../types/MessageType";
import "../style/chat.css";

export const AnonChat = ({
  socket,
  filter,
}: {
  socket: WebSocket | null;
  filter: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [end, setEnd] = useState(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      const data: Message = JSON.parse(e.data);
      switch (data.type) {
        case "LEAVE":
          setEnd(true);
          break;
        case "MESSAGE":
          setMessages((prev) => [...prev, { ...data }]);
          break;
        default:
          setMessages([]);
          setEnd(false);
          break;
      }
    }
    if (socket != null) socket.onmessage = handleMessage;
  }, [messages, socket]);

  function sendMessage() {
    if (!inputValue.trim() || !socket) return;
    const mes: Message = {
      type: "MESSAGE",
      text: inputValue,
      isMe: false,
    };

    socket.send(JSON.stringify(mes));
    setMessages((prev) => [...prev, { ...mes, isMe: true }]);
    setInputValue("");
  }

  function nextAnon() {
    if (!socket) return console.log("problem with connection");
    const filter = localStorage.getItem("searchFilter");
    if (!filter) return console.log("Problem with filters");
    socket.send(filter);
  }
  function leaveRoom() {
    if (!socket) return;
    socket.send(JSON.stringify({ type: "LEAVE__ROOM" }));
    filter();
  }

  return (
    <section className="chat">
      <button onClick={leaveRoom} className="home__btn">
        Leave
      </button>
      <div className="chat__window">
        {messages &&
          messages.map((msg) => (
            <div className={msg.isMe ? "chat__msg mine" : "chat__msg anon"}>
              {msg.text}
            </div>
          ))}
      </div>
      {end ? (
        <div className="system__msg">
          Anon left the chat{" "}
          <button className="home__btn" onClick={filter}>
            Home
          </button>
          <button className="home__btn" onClick={nextAnon}>
            Next
          </button>
        </div>
      ) : null}
      <div className="chat__footer">
        <input
          className="chat__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={end}
        />
        <button className="chat__btn" onClick={sendMessage} disabled={end}>
          ➤
        </button>
      </div>
    </section>
  );
};
