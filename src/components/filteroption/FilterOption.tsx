import React, { useState } from "react";
import { filterOptionData } from "../../constants/filterOptionData";
import "./FilterStyle.css";

export interface itemInterface {
  name: string;
  value: string;
}

interface FilterOptionInterface {
  applyFilter: (item: itemInterface) => void;
  selectRegion: itemInterface;
  initialTheme: string;
}

const FilterOption: React.FC<FilterOptionInterface> = ({
  applyFilter,
  selectRegion,
  initialTheme,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  console.log("selectRegion", selectRegion);

  const hanldeToggleOption = () => {
    setShowOptions(!showOptions);
  };

  const handleFilter = (item: itemInterface) => {
    console.log("itemss", item);
    setShowOptions(!showOptions);
    applyFilter(item);
  };

  return (
    <>
      <div className="filter_box">
        <button
          className={`filter_button  ${
            initialTheme === "dark" ? "dark" : "light"
          }`}
          onClick={hanldeToggleOption}
        >
          {selectRegion ? selectRegion?.name : "  Filter by Region"}
        </button>
        {showOptions && (
          <div
            className={`showFilterOption ${
              initialTheme === "dark" ? "dark" : "light"
            }`}
          >
            {filterOptionData?.map((item, index) => (
              <li key={index} onClick={() => handleFilter(item)}>
                {item?.name}
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterOption;
