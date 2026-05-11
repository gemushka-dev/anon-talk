import { useState, useRef } from "react";
import { AnonSectionFilter } from "./components/AnonFilter";
import "./style/main.css";
import type { FilterData } from "./types/FiltersType";

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
      if (data.message === "Found!") {
        setScreen("chat");
      }
    };
  }
  return (
    <>
      <main>
        {screen === "filter" && (
          <AnonSectionFilter connectWebSocket={connectWebSocket} />
        )}
        {screen === "chat" && <h1>Connected</h1>}
      </main>
    </>
  );
};
