import { useState, useRef } from "react";
import { AnonSectionFilter } from "./components/AnonFilter";
import "./style/main.css";
import type { FilterData } from "./types/FiltersType";
import { AnonChat } from "./components/AnonChat";

export const App = () => {
  const [screen, setScreen] = useState("filter");
  const socketRef = useRef<WebSocket | null>(null);

  function connectWebSocket(filter: FilterData) {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify(filter));
    };
    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.message === "FOUND") {
        setScreen("chat");
      } else if (data.message === "Invalid JSON") {
        alert("Error with filters");
      }
    };
  }
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
