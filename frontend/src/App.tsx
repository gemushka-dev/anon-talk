import { useState, useRef } from "react";
import { AnonSectionFilter } from "./components/AnonFilter";
import "./style/main.css";
import { AnonChat } from "./components/AnonChat";
import { createConnectWs } from "./handlers/connectWebSocket";

export const App = () => {
  const [screen, setScreen] = useState("filter");
  const socketRef = useRef<WebSocket | null>(null);
  const connectWebSocket = createConnectWs(socketRef, setScreen);
  return (
    <>
      <main>
        {screen === "filter" && (
          <AnonSectionFilter connectWebSocket={connectWebSocket} />
        )}
        {screen === "chat" && (
          <AnonChat
            socket={socketRef.current}
            filter={() => setScreen("filter")}
          />
        )}
      </main>
    </>
  );
};
