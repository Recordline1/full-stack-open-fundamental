import './index.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import SearchCountry from './components/SearchCountry'

function App() {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {

        setCountries(response.data)
      })
  }, [])


  const filteredCountries = name === '' ? [] :
    countries.filter(c => c.name.common.toLowerCase()
      .includes(name.toLowerCase()))

  const heandlechange = (e) => {
    setName(e.target.value)
    setSelectedCountry(null)
  }

  return (
    <>
      <h1>Countries</h1>
      <SearchCountry heandlechange={heandlechange} name={name} />
      <Countries countries={filteredCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </>
  )
}

export default App
