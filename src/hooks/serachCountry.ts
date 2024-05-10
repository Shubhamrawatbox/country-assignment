/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from "lodash";
import { useState, useEffect } from "react";
import { apiurl } from "../constants/apiUrl";

interface ApiResponse<T> {
  error: Error | null;
  isLoading: boolean;
  searchResults: T[];
}

const useSearchCountryApi = <T>(searchTerm: string): ApiResponse<T> => {
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const apiUrl = `${apiurl}/name/${searchTerm}?fullText=false`;
    const fetchData = debounce(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setSearchResults(jsonData);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },600)
    if (searchTerm) {
      fetchData();
    } else {
      setSearchResults([]);
    }
    return () => {
      fetchData.cancel();
    };
  }, [searchTerm]);

  return { searchResults, isLoading, error };
};

export default useSearchCountryApi;
