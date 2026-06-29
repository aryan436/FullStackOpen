import Country from "./Country"

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches,specify another filter</p>
    }
    else if (countries.length > 1) {
        return countries.map(country => <Country key={country.cca3} country={country} detailed={false} />)
    }
        
    else if (countries.length === 1) return <Country country={countries[0]} detailed={true} />
    else {
        return <p>nothing found</p>
    }
}
export default Countries