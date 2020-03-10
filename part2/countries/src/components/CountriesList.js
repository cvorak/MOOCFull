import React from 'react'

const CountriesList = ({ countries }) => {
    const rows = () => countries.map(c => <li key={c.name}>{c.name}</li>)

    return (
        <ul>{rows()}</ul>
    )
}

export default CountriesList