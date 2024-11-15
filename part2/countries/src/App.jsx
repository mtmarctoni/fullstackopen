import { useState, useEffect } from 'react'
import { getAll } from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

function App() {
  const [countryList, setCountryList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAll()
      .then(data => {
        const list = data.map(country => country.name.common)
        setCountryList(list)
      })

  }, [])
  
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleShow = (countryName) => {
    //console.log('show', countryName)
    setFilteredList([countryName])
    
  }

  useEffect(() => {    
    const newFilteredList = filter
      ? countryList.filter(country => country.toLowerCase().includes(filter.toLowerCase()))
      : countryList
    setFilteredList(newFilteredList)
      
  }, [filter])


  return (
    <main>
      <h1>Country Information</h1>
      <Filter filter={filter} onFilter={handleFilter} />
      <CountryList countries={filteredList} onShow={handleShow} />
      {(filteredList.length === 1 && <CountryDetails countries={filteredList} />)}
    </main>
  )
}

export default App
