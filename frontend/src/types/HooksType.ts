import type { Message } from "./MessageType";

export type HandleMessageType = {
  setEnd: (value: React.SetStateAction<boolean>) => void;
  setMessages: (value: React.SetStateAction<Message[]>) => void;
};
export type SendMessageType = {
  inputValue: string;
  socket: WebSocket | null;
  setMessages: (value: React.SetStateAction<Message[]>) => void;
  setInputValue: (value: React.SetStateAction<string>) => void;
};
