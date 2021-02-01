import React from 'react'
import {useDispatch} from 'react-redux'
import {submitAnecdote} from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'


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
        dispatch(setNotification(`you posted: ${anecdoteText}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
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