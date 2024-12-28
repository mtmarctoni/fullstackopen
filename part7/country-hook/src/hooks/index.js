import { useState, useEffect } from 'react'

import { getCountry, getAllCountries } from '../service/countries'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            if (name === '') {
                return
            }
            const country = await getCountry(name)
            setCountry(country)

        }
        fetchCountry()
    }, [name])
    
    return country
}
    
