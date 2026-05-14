import type { ClientPersonalData, ClientFrontendData } from "../types/client";
import { WebSocket } from "ws";

const waitingWs = new Map<WebSocket, ClientPersonalData>();

const activeWs = new Map<WebSocket, WebSocket>();

export const connectWebSocket = (ws: WebSocket) => {
  ws.on("message", (data: Buffer) => {
    let dataToSend;
    try {
      dataToSend = JSON.parse(data.toString());
    } catch (e) {
      return ws.send(JSON.stringify({ message: "Invalid JSON" }));
    }
    if (dataToSend && dataToSend.type === "LEAVE__ROOM") {
      const partner = activeWs.get(ws);
      if (partner) {
        if (partner.readyState === WebSocket.OPEN) {
          partner.send(JSON.stringify({ type: "LEAVE" }));
        }
        activeWs.delete(partner);
      }
      activeWs.delete(ws);
      waitingWs.delete(ws);
      return;
    }
    if (dataToSend && dataToSend.type === "MESSAGE") {
      const partner = activeWs.get(ws);
      if (partner && partner.readyState === WebSocket.OPEN) {
        partner.send(JSON.stringify(dataToSend));
      }
      return;
    }
    matchWebSocket(dataToSend, ws);
  });
  ws.on("close", () => {
    waitingWs.delete(ws);
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
    if (!data || !data.my || !data.search) {
      return console.error("Invalid JSON data", data);
    }
    const { my, search } = data;
    let partnerWs: WebSocket | null = null;
    for (const [waitingSocket, info] of waitingWs) {
      if (
        waitingSocket !== ws &&
        info.sex === search.sex &&
        info.age === search.age
      ) {
        partnerWs = waitingSocket;
        break;
      }
    }
    if (partnerWs) {
      waitingWs.delete(partnerWs);
      waitingWs.delete(ws);
      activeWs.set(ws, partnerWs);
      activeWs.set(partnerWs, ws);
      ws.send(JSON.stringify({ message: "Found!" }));
      partnerWs.send(JSON.stringify({ message: "Found!" }));
    } else {
      waitingWs.set(ws, my);
    }
  } catch (e) {
    console.error("Error: ", e);
  }
}
