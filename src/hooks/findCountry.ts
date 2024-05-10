import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  countryData: T | null;
}


const findCountryName=async(url,name)=>{
  try {
    const  response = await fetch(`${url}/all?fields=cca3,name`);
   if (!response.ok) {
     throw new Error('Failed to fetch data');
   }
   const jsonData = await response.json();
   const result=jsonData?.filter((item:any)=>item?.cca3 === name)
   return result?.[0]?.name?.official
 } catch (error:any) {
   console.log(error);
 }
}


export default findCountryName;
