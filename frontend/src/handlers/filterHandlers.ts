import type { ClientPersonalData, FilterData } from "../types/FiltersType";

export const createStartHandler = (
  my: ClientPersonalData,
  search: ClientPersonalData,
  connectWebSocket: (filter: FilterData) => void,
) => {
  return () => {
    const filter: FilterData = {
      type: "MATCH",
      data: {
        my,
        search,
      },
    };
    localStorage.setItem("searchFilter", JSON.stringify(filter));
    connectWebSocket(filter);
  };
};
