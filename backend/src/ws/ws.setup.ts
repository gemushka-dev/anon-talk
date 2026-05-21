import { WebSocketServer, WebSocket } from "ws";
import { chatGateway } from "./chat.gateway";

export const setupWebSocketServer = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket) => {
    chatGateway.handleConnection(ws);
  });
};
