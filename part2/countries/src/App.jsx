import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const handleChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);
  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));
  console.log(countriesToShow);
  return (
    <>
      find countries
      <input value={search} onChange={handleChange} />
      <Countries countries={countriesToShow}/>
    </>
  );
};

export default App;
