import { FaSearch } from "react-icons/fa";
import "./HeaderStyle.css";
import FilterOption, { itemInterface } from "../filteroption/FilterOption";
import { useTheme } from "../../context/ThemeContext";
import React from "react";



interface FilterOptionInterface {
  handleSearch:(e: string)=> void;
  applyFilter: (item: itemInterface) => void;
  selectRegion: itemInterface;
  initialTheme: string;
  value:string
}


const HaederFilter:React.FC<Omit<FilterOptionInterface,'initialTheme'>> = ({handleSearch,value,applyFilter,selectRegion}) => {

  const { initialTheme } = useTheme();


  return (
    <>
      <div className={`filter-container ${initialTheme === 'dark' ? 'dark' : 'light'}`}>
        <label htmlFor="search-button">
          <input type="search" name="search-button"  placeholder="Search for a country..."   aria-label="search-button" value={value} onChange={(e:any)=>handleSearch(e.target.value)} />
          <span id="icon">
            <FaSearch />
          </span>
        </label>
        <FilterOption applyFilter={applyFilter} selectRegion={selectRegion} initialTheme={initialTheme}/>
      </div>
    </>
  );
};

export default HaederFilter;
