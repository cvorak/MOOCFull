import React from 'react'

const PersonForm = (props) => {
    const {
      newName,
      newNumber,
      handleInputNameChange,
      handleInputNumberChange,
      handleClick
    } = props
  
    return (
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
    )
  }

export default PersonForm