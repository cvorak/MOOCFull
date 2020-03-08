import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setPersons(persons.concat(newPersonObj))
    setNewName('')
  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} handleChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <Persons
        filterText={filterText}
        persons={persons}
      />
    </div>
  )
}

export default App;
