export type Message = {
  type: "LEAVE" | "MESSAGE";
  data?: {
    text: string;
    isMe: boolean;
  };
};
