/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

const useGetCountryDetailsApi = <T>(url: string,id?:string  | undefined): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response=null;
        if(id){
          response = await fetch(`${url}/${id}`);
        }else{
          response = await fetch(url);
        }
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        
      } catch (error:any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      // Cleanup function
    };
  }, []);

  return { data, error, isLoading };
};

export default useGetCountryDetailsApi;
