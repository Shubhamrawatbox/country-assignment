import { useTheme } from "../../context/ThemeContext";
import "./countryStyle.css";
import { Link } from "react-router-dom";
import CountryDetails from "../../interface/countryDetailsInterface";
import React from "react";

const CountryCard: React.FC<CountryDetails> = ({singleCountryData}) => {
  const {
    name,
    capital,
    flags,
    population,
  } = singleCountryData ?? null;

  // console.log('singleCountryData',singleCountryData)

  const convertToMillionText = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + " million";
    } else {
      return num?.toString();
    }
  };

  const { initialTheme } = useTheme();
  return (
    <>
      <Link to={`/details/${name?.official}`}>
        <div
          className={`country-card ${
            initialTheme === "dark" ? "dark" : "light"
          }`}
        >
          <img className="country-flag" src={flags?.svg} alt="Flag of United States" />
          <div className="country-details">
            <div className="country-name">{name?.common}</div>
            <div className="country-capital">
              Capital: {capital?.toString()}
            </div>
            <div className="country-population">
              Population: {convertToMillionText(population)}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CountryCard;
