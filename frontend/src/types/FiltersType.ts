export type FilterData = {
  my: ClientPersonalData;
  search: ClientPersonalData;
};

export type ClientPersonalData = {
  sex: "m" | "w";
  age: "below 17" | "17-25" | "25-36" | "over 36";
};
export type GenderType = "m" | "w";
export type AgeType = "below 17" | "17-25" | "25-36" | "over 36";
