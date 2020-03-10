import React, { useState } from 'react';
import axios from 'axios'
import './App.css';
import Results from './components/Results'

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    // temp variable because setFilterText is not fast enough
    // to change state of filterText in request below
    const filter = event.target.value
    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        const countries = res.data
          .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

        setCountries(countries)
      })
  }

  return (
    <>
      <div>
        find countries
      <input
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <Results countries={countries} />
    </>
  )
}

export default App;
