const Country = ({ country }) => {
    console.log('country:', country)
    
    if (!country) {
        return null
    }

    if (country?.found === false) {
        return (
        <div>
            not found...
        </div>
        )
    }

    return (
        <div>
        <h3>{country.name.official} </h3>
        <div>Capital: {country.capital[0]} </div>
        <div>Population: {country.population}</div> 
        <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
        </div>
    )
}
  
export default Country