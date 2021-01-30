import React from 'react'
import {useDispatch} from 'react-redux'
import {submitAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const getId = () => (100000 * Math.random()).toFixed(0)

    const handleSubmit = (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = {
            content: anecdoteText,
            id: getId(),
            votes: 0
        }
        dispatch(submitAnecdote(anecdote))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm