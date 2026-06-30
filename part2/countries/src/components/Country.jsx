const Country = ({ country, detailed ,handleShow}) => {
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
        return (
         
            <div>
              {country.name.common} <button onClick={()=>handleShow(country)}>show</button>
            </div>
            
        
        );
    }
}
export default Country