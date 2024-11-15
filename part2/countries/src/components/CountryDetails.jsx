import { useState, useEffect } from "react"
import { getCountryDetails, getCountryWeather } from "../services/countries"

const CountryDetails = ({countries}) => {
    
    const [country, setCountry] = useState(null)
    //console.log(country);

    useEffect(() => {
        getCountryDetails(countries[0]).then(data => {

            let newCountry = {
                name: countries[0],
                capital: data.capital[0],
                area: `${data.area} km2`,
                languages: Object.values(data.languages),
                hrefFlag: data.flags.png,
                lat: data.capitalInfo.latlng[0],
                lon: data.capitalInfo.latlng[1],
            }

            getCountryWeather(newCountry.lat, newCountry.lon)
                .then((data) => {
                    newCountry = {
                        ...newCountry,
                        tmp: `${data.main.temp} ºF`,
                        windSpeed: `${data.wind.speed} m/s`,
                        description: data.weather[0].description,

                    }
                    setCountry(newCountry)
                })
        })
    },[])
       

    if (country=== null) return null
    return (
        <section>
            <h2>Country Details: {country.name}</h2>
            <div>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <strong>Languages:</strong>
                <ul>
                    {country.languages.map(lan => <li key={lan}>{lan}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.hrefFlag} alt="flag" />
            </div>
            <div>
                <h3>Weather in {country.capital}</h3>
                <p>{country.description}</p>
                <p>Temperature: {country.tmp}</p>
                <p> Wind Speed: {country.windSpeed}</p>
            </div>

        </section>
    )
}

export default CountryDetails