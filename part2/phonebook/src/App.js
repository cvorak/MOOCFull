import React, { useState, useEffect } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personService
          .update(id, newPersonObj)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === id ? updatedPerson : p ))
            setNewName('')
            setNewNumber('')
          })
      }

    } else {
      personService.create(newPersonObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
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

  const handleDeleteOf = (id) => {
    if (!window.confirm(`Delete ${persons.find(p => p.id === id).name}`))
      return

    personService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
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
        handleDeleteOf={handleDeleteOf}
      />
    </div>
  )
}

export default App;
