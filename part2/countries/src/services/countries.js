import axios from 'axios'

const baseApiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const apiKeyWeather = import.meta.env.VITE_API_KEY_WEATHER
const baseApiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const getAll = () => {
    const req = axios.get(`${baseApiUrl}/all`)
    return req.then(res => res.data)
}

const getCountryDetails = (country) => {
    const req = axios.get(`${baseApiUrl}/name/${country}`)
    return req.then(res => res.data)
}

const getCountryWeather = (lat, lon) => {
    const req = axios.get(`${baseApiWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`)
    return req.then(res => res.data)
}
export {
    getAll,
    getCountryDetails,
    getCountryWeather
}