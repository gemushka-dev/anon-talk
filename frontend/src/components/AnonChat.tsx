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
      const data = JSON.parse(e.data);
      if (data.type === "LEAVE") {
        setEnd(true);
      }
      setMessages((prev) => [...prev, { text: data.text, isMe: false }]);
    }
    if (socket != null) socket.onmessage = handleMessage;
  }, [messages, socket]);

  function sendMessage() {
    if (!inputValue.trim() || !socket) return;

    socket.send(JSON.stringify({ text: inputValue }));
    setMessages((prev) => [...prev, { text: inputValue, isMe: true }]);
    setInputValue("");
  }
  return (
    <section className="chat">
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
