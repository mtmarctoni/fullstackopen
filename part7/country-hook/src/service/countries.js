const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getAllCountries = async () => {
    const res = await fetch(`${baseUrl}/all`)
    const json = await res.json()
    return json
}

export const getCountry = async (name) => {
    const res = await fetch(`${baseUrl}/name/${name.toLowerCase()}`)
    if (res.status === 404) {
        return { found: false }
    }
    const json = await res.json()
    return json
}

