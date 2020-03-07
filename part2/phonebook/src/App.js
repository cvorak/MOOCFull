import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleClick = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName
    }
    
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setPersons(persons.concat(newPersonObj))
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const rows = () => persons.map(p => <li key={p.name}>{p.name}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleInputChange}
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
