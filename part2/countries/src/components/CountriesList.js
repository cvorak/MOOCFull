import React, {useState} from 'react'
import CountryWithFlag from './CountryWithFlag'

const CountriesList = ({ countries }) => {
    const [countryToShow, setCountryToShow] = useState('')

    const handleShow = (event) => {
        setCountryToShow(event.target.getAttribute('data-name'))
    }

    const rows = () => countries.map(c => {
        return (
            <li key={c.name}>{c.name}
                <button data-name={c.name} onClick={handleShow}>show</button>
            </li>
        )
    })

    if (countryToShow) return <CountryWithFlag country={countries.find(c => c.name === countryToShow)} />

    return (
        <ul>{rows()}</ul>
    )
}

export default CountriesList