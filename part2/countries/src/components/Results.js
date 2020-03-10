import React from 'react'
import CountriesList from './CountriesList'
import CountryWithFlag from './CountryWithFlag' 

const Results = ({ countries }) => {
    if (countries.length === 0) return null
  
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else if (countries.length > 1) {
      return <CountriesList countries={countries} />
    } else {
      return <CountryWithFlag country={countries[0]} />
    }
  }

  export default Results