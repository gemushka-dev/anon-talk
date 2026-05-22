import { useState } from "react";
import { filterData, genderFilterData } from "../data/filterData";

import "../style/lobby.css";
import type { GenderType, AgeType, FilterData } from "../types/FiltersType";
import { createStartHandler } from "../handlers/filterHandlers";
import { FilterSection } from "./FilterSection";

export const AnonSectionFilter = ({
  connectWebSocket,
}: {
  connectWebSocket: (filter: FilterData) => void;
}) => {
  const [myAge, setMyAge] = useState<AgeType>("below 17");
  const [myGender, setMyGender] = useState<GenderType>("m");
  const [searchAge, setSearchAge] = useState<AgeType>("below 17");
  const [searchGender, setSearchGender] = useState<GenderType>("m");

  const handleStartClick = createStartHandler(
    { age: myAge, sex: myGender },
    { age: searchAge, sex: searchGender },
    connectWebSocket,
  );

  const clickMyAge = (val: AgeType) => setMyAge(val);
  const clickMyGender = (val: GenderType) => setMyGender(val);
  const clickSearchAge = (val: AgeType) => setSearchAge(val);
  const clickSearchGender = (val: GenderType) => setSearchGender(val);

  return (
    <section className="filter">
      <h1 className="filter__title">AnonTalk</h1>
      <div className="container">
        <div className="me">
          <FilterSection
            text="Gender:"
            array={genderFilterData as GenderType[]}
            uniqKey="me_gender"
            onClick={clickMyGender}
            className="gender"
            valueCheck={myGender}
          />
          <FilterSection
            text="Age:"
            array={filterData as AgeType[]}
            uniqKey="me_age"
            onClick={clickMyAge}
            className="age"
            valueCheck={myAge}
          />
        </div>
        <div className="search">
          <FilterSection
            text="Gender:"
            array={genderFilterData as GenderType[]}
            uniqKey="search_gender"
            onClick={clickSearchGender}
            className="gender"
            valueCheck={searchGender}
          />
          <FilterSection
            text="Age:"
            array={filterData as AgeType[]}
            uniqKey="search_age"
            onClick={clickSearchAge}
            className="age"
            valueCheck={searchAge}
          />
        </div>
        <button className="search__btn" onClick={handleStartClick}>
          Start
        </button>
      </div>
    </section>
  );
};
