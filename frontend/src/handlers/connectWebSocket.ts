import type { FilterData } from "../types/FiltersType";

export const createConnectWs = (
  socketRef: React.RefObject<WebSocket | null>,
  setScreen: React.Dispatch<React.SetStateAction<string>>,
) => {
  return (filter: FilterData) => {
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
  };
};
