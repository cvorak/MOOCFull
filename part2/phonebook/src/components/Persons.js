import React from 'react'

const Persons = ({ persons, filterText }) => {
    const rows = () => persons
      .filter(p => p.name.toLowerCase().includes(filterText))
      .map(p => <li key={p.name}>{p.name} {p.number}</li>)
  
    return (
      <ul>
        {rows()}
      </ul>
    )
  }

export default Persons