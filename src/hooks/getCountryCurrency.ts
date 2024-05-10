

export const getCountryCurrency = (currencyValue: any) => {
  const keys = Object.keys(currencyValue);
  const currencyName = currencyValue[keys[0]].name;
  return currencyName
};
