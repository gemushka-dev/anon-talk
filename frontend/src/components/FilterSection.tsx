import type { FilterSectionType } from "../types/FilterSectionType";
import { Button } from "./Button";
import "../style/lobby.css";

export const FilterSection = <T extends string>({
  text,
  className,
  array,
  uniqKey,
  onClick,
  valueCheck,
}: FilterSectionType<T>) => {
  return (
    <>
      <span>{text}</span>
      <div className={className}>
        {array.map((el) => (
          <Button
            text={el}
            key={el + uniqKey}
            onClick={() => onClick(el)}
            isActive={valueCheck === el}
          />
        ))}
      </div>
    </>
  );
};
