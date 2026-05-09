import { WebSocketServer } from "ws";
import { setupWebSocketServer } from "./src/websocket/ws.setup";

const wss = new WebSocketServer({ port: 8080 });

setupWebSocketServer(wss);
