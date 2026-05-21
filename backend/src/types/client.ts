export type ClientFilterType = {
  my: ClientPersonalData;
  search: ClientPersonalData;
};

export type ClientPersonalData = {
  sex: "m" | "w";
  age: "below 17" | "17-25" | "25-36" | "over 36";
};

export type ClientFrontendData =
  | {
      type: "MESSAGE";
      data: { message: string };
    }
  | {
      type: "MATCH";
      data: ClientFilterType;
    }
  | {
      type: "LEAVE";
    };
