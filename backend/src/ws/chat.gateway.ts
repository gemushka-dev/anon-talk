import { WebSocket } from "ws";
import { chatService } from "../modules/chat/chat.service";

class ChatGateway {
  handleConnection(ws: WebSocket) {
    ws.on("message", (data: Buffer) => {
      try {
        const parsed = JSON.parse(data.toString());
        chatService.handleMessage(ws, parsed);
      } catch (e) {
        ws.send(JSON.stringify({ message: "Invalid JSON" }));
      }
    });

    ws.on("close", (data: Buffer) => {
      chatService.handleMessage(ws, { type: "LEAVE" });
    });
  }
}

export const chatGateway = new ChatGateway();
