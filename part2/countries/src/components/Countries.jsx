import Country from "./Country";

const Countries = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches,specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((country) => (
      <Country
        key={country.cca3}
        country={country}
        detailed={false}
        handleShow={handleShow}
      />
    ));
  } else if (countries.length === 1)
    return (
      <Country country={countries[0]} detailed={true} handleShow={handleShow} />
    );
  else {
    return <p>nothing found</p>;
  }
};
export default Countries;
