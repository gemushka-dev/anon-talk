import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3500 });

wss.on("connection", (ws: WebSocket) => {
  console.log("New user");
  ws.on("message", (data: Buffer) => {
    console.log("New message");
    ws.send(data.toString());
  });
  ws.on("close", () => {
    console.log("User disconnected");
  });

  ws.on("error", (err) => {
    console.error("Socket error:", err);
  });
});
