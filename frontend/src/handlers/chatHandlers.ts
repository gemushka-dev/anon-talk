import type { HandleMessageType, SendMessageType } from "../types/HooksType";
import type { Message } from "../types/MessageType";

export const createMessageHandler = ({
  setEnd,
  setMessages,
}: HandleMessageType) => {
  return (e: MessageEvent) => {
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
  };
};

export const createSendMessage = ({
  inputValue,
  socket,
  setMessages,
  setInputValue,
}: SendMessageType) => {
  return () => {
    if (!inputValue.trim() || !socket) return;
    const mes: Message = {
      type: "MESSAGE",
      text: inputValue,
      isMe: false,
    };

    socket.send(JSON.stringify(mes));
    setMessages((prev) => [...prev, { ...mes, isMe: true }]);
    setInputValue("");
  };
};

export const createNextSearch = (socket: WebSocket | null) => {
  return () => {
    if (!socket) return console.log("problem with connection");
    const filter = localStorage.getItem("searchFilter");
    if (!filter) return console.log("Problem with filters");
    socket.send(filter);
  };
};

export const createLeave = (socket: WebSocket | null, filter: () => void) => {
  return () => {
    if (!socket) return;
    socket.send(JSON.stringify({ type: "LEAVE__ROOM" }));
    filter();
  };
};
