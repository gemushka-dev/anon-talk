import { WebSocket } from "ws";
import { chatStore } from "./chat.store";
import type {
  ClientFrontendData,
  ClientPersonalData,
} from "../../types/client";

class ChatService {
  handleMessage(ws: WebSocket, data: ClientFrontendData) {
    switch (data.type) {
      case "MESSAGE": {
        const partner = chatStore.getPartner(ws);
        if (!partner) return;
        partner.send(JSON.stringify(data));
        break;
      }

      case "LEAVE": {
        this.leave(ws);
        break;
      }

      case "MATCH": {
        this.matchPartner(ws, data.data.search);
        break;
      }

      default: {
        console.warn("Unknown data type:", data);
        break;
      }
    }
  }
  private matchPartner(ws: WebSocket, data: ClientPersonalData) {
    const partnerWs = chatStore.findMatch(ws, data);
    if (!partnerWs) {
      return chatStore.addWaiting(ws, data);
    }

    chatStore.createPair(ws, partnerWs);
    ws.send(JSON.stringify({ message: "FOUND" }));
    partnerWs.send(JSON.stringify({ message: "FOUND" }));
  }
  private leave(ws: WebSocket) {
    const partner = chatStore.getPartner(ws);
    if (partner?.readyState === WebSocket.OPEN) {
      partner.send(JSON.stringify({ type: "LEAVE" }));
    }
    chatStore.clear(ws);
  }
}

export const chatService = new ChatService();
