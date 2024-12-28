import { useState, useEffect } from 'react'

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
  
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getResources = async () => {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setResources(data)
        }
        getResources()
    }, [baseUrl])

    const create = (resource) => {
        const postResource = async () => {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resource)
            })
            const data = await response.json()
            setResources(resources.concat(data))
        }
        postResource()
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}