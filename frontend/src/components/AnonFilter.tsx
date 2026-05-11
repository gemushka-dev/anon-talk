import { Button } from "./Button";
import { useRef, useState } from "react";
import { filterData, genderFilterData } from "../data/filterData";

import "../style/lobby.css";
import type { GenderType, AgeType } from "../types/FiltersType";

export const AnonSectionFilter = () => {
  const meRef = useRef<AgeType>("below 17");
  const meRefGender = useRef<GenderType>("m");
  const searchRef = useRef<AgeType>("below 17");
  const searchRefGender = useRef<GenderType>("m");
  const [selectedMe, setSelectedMe] = useState("below 17");
  const [genderMe, setGenderMe] = useState("m");
  const [selectedSeacrh, setSelectedSearch] = useState("below 17");
  const [genderSearch, setGenderSearch] = useState("m");

  function clickHandler(data: AgeType) {
    meRef.current = data;
    setSelectedMe(data);
  }
  function clickHandlerGender(data: GenderType) {
    meRefGender.current = data;
    setGenderMe(data);
  }
  function clickSearchHandler(data: AgeType) {
    searchRef.current = data;
    setSelectedSearch(data);
  }
  function clickSearchGender(data: GenderType) {
    searchRefGender.current = data;
    setGenderSearch(data);
  }

  return (
    <section className="filter">
      <h1 className="filter__title">AnonTalk</h1>
      <div className="container">
        <div className="me">
          <span>Gender:</span>
          <div className="gender">
            {genderFilterData.map((el) => (
              <Button
                text={el}
                key={el + "me_gender"}
                onClick={() => clickHandlerGender(el as GenderType)}
                isActive={genderMe === el}
              />
            ))}
          </div>
          <span>Age:</span>
          <div className="age">
            {filterData.map((el) => (
              <Button
                text={el}
                key={el + "me_age"}
                onClick={() => clickHandler(el as AgeType)}
                isActive={selectedMe === el}
              />
            ))}
          </div>
        </div>
        <div className="search">
          <span>Gender:</span>
          <div className="gender">
            {genderFilterData.map((el) => (
              <Button
                text={el}
                key={el + "search_gender"}
                onClick={() => clickSearchGender(el as GenderType)}
                isActive={genderSearch === el}
              />
            ))}
          </div>

          <span>Age:</span>
          <div className="age">
            {filterData.map((el) => (
              <Button
                text={el}
                key={el + "search_age"}
                onClick={() => clickSearchHandler(el as AgeType)}
                isActive={selectedSeacrh === el}
              />
            ))}
          </div>
        </div>
        <button className="search__btn" onClick={() => console.log("Connect")}>
          Start
        </button>
      </div>
    </section>
  );
};
