const Country = ({ country, detailed }) => {
    console.log(Object.values(country.languages));
    if (detailed) {
        return <>
            <h1>{country.name.common}</h1>
            <p>capital { country.capital[0]}</p>
            <p>area { country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language => <li key={language} >{ language}</li>))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </>
    }
    else {
        return <p>{ country.name.common}</p>
    }
}
export default Country