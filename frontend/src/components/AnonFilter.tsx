import { Button } from "./Button";
import { useState } from "react";
import { filterData, genderFilterData } from "../data/filterData";

import "../style/lobby.css";
import type { GenderType, AgeType, FilterData } from "../types/FiltersType";

export const AnonSectionFilter = ({
  connectWebSocket,
}: {
  connectWebSocket: (filter: FilterData) => void;
}) => {
  const [myAge, setMyAge] = useState<AgeType>("below 17");
  const [myGender, setMyGender] = useState<GenderType>("m");
  const [searchAge, setSearchAge] = useState<AgeType>("below 17");
  const [searchGender, setSearchGender] = useState<GenderType>("m");

  function handleStartClick() {
    const filter: FilterData = {
      my: { sex: myGender, age: myAge },
      search: { sex: searchGender, age: searchAge },
    };
    localStorage.setItem("searchFilter", JSON.stringify(filter));
    connectWebSocket(filter);
  }

  const clickMyAge = (val: AgeType) => setMyAge(val);
  const clickMyGender = (val: GenderType) => setMyGender(val);
  const clickSearchAge = (val: AgeType) => setSearchAge(val);
  const clickSearchGender = (val: GenderType) => setSearchGender(val);

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
                onClick={() => clickMyGender(el as GenderType)}
                isActive={myGender === el}
              />
            ))}
          </div>
          <span>Age:</span>
          <div className="age">
            {filterData.map((el) => (
              <Button
                text={el}
                key={el + "me_age"}
                onClick={() => clickMyAge(el as AgeType)}
                isActive={myAge === el}
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
                isActive={searchGender === el}
              />
            ))}
          </div>

          <span>Age:</span>
          <div className="age">
            {filterData.map((el) => (
              <Button
                text={el}
                key={el + "search_age"}
                onClick={() => clickSearchAge(el as AgeType)}
                isActive={searchAge === el}
              />
            ))}
          </div>
        </div>
        <button className="search__btn" onClick={handleStartClick}>
          Start
        </button>
      </div>
    </section>
  );
};
