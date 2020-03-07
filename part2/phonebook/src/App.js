import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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

  const rows = () => persons
    .filter(p => p.name.toLowerCase().includes(filterText))
    .map(p => <li key={p.name}>{p.name} {p.number}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleInputNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleInputNumberChange}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleClick}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}


export default App;
