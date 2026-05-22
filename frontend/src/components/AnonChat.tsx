import { useEffect, useState } from "react";
import type { Message } from "../types/MessageType";
import "../style/chat.css";
import {
  createMessageHandler,
  createSendMessage,
  createNextSearch,
  createLeave,
} from "../handlers/chatHandlers";

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

  const handleMessage = createMessageHandler({ setEnd, setMessages });
  const sendMessage = createSendMessage({
    inputValue,
    socket,
    setMessages,
    setInputValue,
  });
  const nextSearch = createNextSearch(socket);
  const leave = createLeave(socket, filter);

  useEffect(() => {
    if (socket != null) socket.onmessage = handleMessage;
  }, [socket]);

  return (
    <section className="chat">
      <button onClick={leave} className="home__btn">
        Leave
      </button>
      <div className="chat__window">
        {messages &&
          messages.map((msg) => (
            <div
              className={msg.data?.isMe ? "chat__msg mine" : "chat__msg anon"}
            >
              {msg.data?.text}
            </div>
          ))}
      </div>
      {end ? (
        <div className="system__msg">
          Anon left the chat{" "}
          <button className="home__btn" onClick={filter}>
            Home
          </button>
          <button className="home__btn" onClick={nextSearch}>
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
