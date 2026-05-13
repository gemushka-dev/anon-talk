export type Message = {
  type: "LEAVE" | "MESSAGE";
  text: string;
  isMe: boolean;
};
