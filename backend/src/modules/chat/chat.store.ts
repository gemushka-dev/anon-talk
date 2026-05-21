import { WebSocket } from "ws";
import { ClientPersonalData } from "../../types/client";

class ChatStore {
  waiting = new Map<WebSocket, ClientPersonalData>();
  active = new Map<WebSocket, WebSocket>();

  addWaiting(ws: WebSocket, data: ClientPersonalData) {
    this.waiting.set(ws, data);
  }
  findMatch(ws: WebSocket, data: ClientPersonalData) {
    for (const [socket, info] of this.waiting) {
      if (socket !== ws && info.sex === data.sex && info.age === data.age) {
        return socket;
      }
    }
    return null;
  }
  createPair(a: WebSocket, b: WebSocket) {
    if (this.active.has(a) || this.active.has(b)) return;
    this.waiting.delete(a);
    this.waiting.delete(b);

    this.active.set(a, b);
    this.active.set(b, a);
  }
  getPartner(ws: WebSocket) {
    return this.active.get(ws);
  }
  clear(ws: WebSocket) {
    this.waiting.delete(ws);
    const partner = this.active.get(ws);
    if (partner) {
      this.active.delete(partner);
      this.waiting.delete(partner);
    }
    this.active.delete(ws);
  }
}

export const chatStore = new ChatStore();
