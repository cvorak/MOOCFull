import React from 'react'

const CountryWithFlag = ({ country }) => {
    const rows = () => country.languages.map(l => <li key={l.name}>{l.name}</li>)

    return (
        <>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>{rows()}</ul>
            <img src={country.flag} width='100px' alt="" />
        </>
    )
}

export default CountryWithFlag