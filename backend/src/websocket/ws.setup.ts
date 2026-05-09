import { WebSocketServer, WebSocket } from "ws";
import { connectWebSocket } from "./ws.handlers";

export const setupWebSocketServer = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket) => connectWebSocket(ws));
};
