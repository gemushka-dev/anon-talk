import type { ClientPersonalData, ClientFrontendData } from "../types/client";
import { WebSocket } from "ws";

const waitingWs = new Map<WebSocket, ClientPersonalData>();

const activeWs = new Map<WebSocket, WebSocket>();

export const connectWebSocket = (ws: WebSocket) => {
  ws.on("message", (data: Buffer) => {
    const partner = activeWs.get(ws);
    if (partner) {
      if (partner.readyState === WebSocket.OPEN) {
        partner.send(data.toString());
      }
    } else {
      matchWebSocket(data, ws);
    }
  });
  ws.on("close", () => {
    const partner = activeWs.get(ws);
    if (partner) {
      if (partner.readyState === WebSocket.OPEN) {
        partner.send(JSON.stringify({ type: "LEAVE" }));
        activeWs.delete(ws);
        activeWs.delete(partner);
      }
    }
  });
};

function matchWebSocket(data: any, ws: WebSocket) {
  try {
    const { my, search }: ClientFrontendData = JSON.parse(data.toString());
    let partnerWs: WebSocket | null = null;

    for (const [waitingSocket, info] of waitingWs) {
      if (info.sex === search.sex && info.age === search.age) {
        partnerWs = waitingSocket;
        break;
      }
    }

    if (partnerWs) {
      waitingWs.delete(partnerWs);
      activeWs.set(ws, partnerWs);
      activeWs.set(partnerWs, ws);

      ws.send(JSON.stringify({ message: "Found!" }));
      partnerWs.send(JSON.stringify({ message: "Found!" }));
    } else {
      waitingWs.set(ws, my);
    }
  } catch (e) {
    console.error("Invalid JSON data");
  }
}
