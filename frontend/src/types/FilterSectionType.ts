export type FilterSectionType<T extends string> = {
  text: string;
  array: readonly T[] | T[];
  className: string;
  uniqKey: string;
  onClick: (val: T) => void;
  valueCheck: T;
};
