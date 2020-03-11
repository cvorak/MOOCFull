import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterText, handleDeleteOf }) => {
  const rows = () => persons
    .filter(p => p.name.toLowerCase().includes(filterText))
    .map(p => <Person key={p.name} person={p} handleDelete={() => handleDeleteOf(p.id)} />)

  return (
    <ul>
      {rows()}
    </ul>
  )
}

export default Persons