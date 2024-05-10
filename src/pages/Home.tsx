import HaederFilter from "../components/headerFilter/HaederFilter";
import CountryCard from "../components/countryCard/CountryCard";
import Loader from "../components/loader/Loader";
import useGetCountryDetailsApi from "../hooks/getCountryDetails";
import CountryDetails from "../interface/countryDetailsInterface";
import { useState } from "react";
import useSearchCountryApi from "../hooks/serachCountry";
import { apiurl } from "../constants/apiUrl";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectRegion, setSelectRegion] = useState<any>("");
  const [filterData, setFilteredData] = useState<CountryDetails[]>([]);

  const apiUrl = `${apiurl}/all`;
  const { data, error, isLoading } =
    useGetCountryDetailsApi<CountryDetails[]>(apiUrl);

  const { searchResults } = useSearchCountryApi(searchTerm);

  const handleSearch = (searchValue: string) => {
    setSelectRegion("");
    setSearchTerm(searchValue);
  };

  const applyFilter = async (filterValue: any) => {
    setSelectRegion(filterValue);
    setSearchTerm("");
    try {
      const response = await fetch(`${apiurl}/region/${filterValue?.value}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }
      const filteredData = await response.json();
      setFilteredData(filteredData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>Something Went Wrong!</p>;
  }

  const renderData: CountryDetails[] = (
    searchTerm !== "" ? searchResults : selectRegion !== "" ? filterData : data
  ) as CountryDetails[];

  return (
    <>
      <HaederFilter
        handleSearch={handleSearch}
        value={searchTerm}
        applyFilter={applyFilter}
        selectRegion={selectRegion}
      />
      <div className="container">
        {renderData?.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          renderData?.map((singleData: any, index: number) => (
            <CountryCard singleCountryData={singleData} key={index} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
