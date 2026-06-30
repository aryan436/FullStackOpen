import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null)
  };
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);
  const countriesToShow = selectedCountry?[selectedCountry]:countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));
  const handleShow = (country) => {
    setSelectedCountry(country)
  }
  
  return (
    <>
      find countries
      <input value={search} onChange={handleChange} />
      <Countries countries={countriesToShow} handleShow={ handleShow} />
    </>
  );
};

export default App;
