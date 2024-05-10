/* eslint-disable no-var */
import { useNavigate, useParams } from "react-router-dom";
import InfoTitle from "../components/infoTitle/InfoTitle";
import useGetCountryDetailsApi from "../hooks/getCountryDetails";
import CountryDetails from "../interface/countryDetailsInterface";
import Loader from "../components/loader/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { getCountryCurrency } from "../hooks/getCountryCurrency";
import { apiurl } from "../constants/apiUrl";
import findCountryName from "../hooks/findCountry";

const ItemDetail = () => {
  const { id } = useParams(); // Accessing the id parameter from the URL
  const apiUrl = `${apiurl}/name`;
  const { data, error, isLoading } = useGetCountryDetailsApi<CountryDetails[]>(
    apiUrl,
    id
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Something Went Wrong!</p>;
  }
  const {
    name,
    tld,
    population,
    region,
    languages,
    subregion,
    capital,
    flags: { svg },
    borders,
    currencies,
  }: any = data?.[0] ?? null;

  const { initialTheme } = useTheme();

  const handleClick = async (value: string) => {
    const findcountryname = await findCountryName(apiurl, value);
    console.log("resp", findcountryname);
    navigate(`/details/${findcountryname}`);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className={`back_btn ${initialTheme === "dark" ? "dark" : "light"}`}
      >
        <IoMdArrowRoundBack />
        Back
      </button>
      <div className="details-container">
        <div className="leftSideImg">
          <img
            src={svg}
            alt="not-found"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="rightSideContent">
          <h1>{name?.common ?? ""}</h1>
          <div className="infoGridList">
            <InfoTitle newkey={"Native Name"} value={name?.official ?? ""} />
            <InfoTitle newkey={"Top Level Domain"} value={tld?.toString(" ")} />
            <InfoTitle newkey={"Population"} value={population ?? ""} />
            <InfoTitle
              newkey={"Currencies"}
              value={getCountryCurrency(currencies)}
            />
            <InfoTitle newkey={"Region"} value={region ?? ""} />
            <InfoTitle
              newkey={"Languages"}
              value={Object?.values(languages)?.toString() ?? ""}
            />
            <InfoTitle newkey={"Sub Region"} value={subregion ?? ""} />
            <InfoTitle newkey={"Capital"} value={capital?.toString() ?? ""} />
          </div>
          <div className="border_name_container">
            <span className="keybold">Border Countries:</span>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {borders?.map((borderName: any, index: number) => (
                <div
                  key={index}
                  className={`border_name_box ${
                    initialTheme === "dark" ? "dark" : "light"
                  }`}
                  onClick={() => handleClick(borderName)}
                >
                  {borderName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
