import React from 'react'
import {useDispatch} from 'react-redux'
import {submitAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = {
            content: anecdoteText,
            votes: 0
        }
        dispatch(submitAnecdote(anecdote))
        dispatch(setNotification(`you posted: ${anecdote.content}`, 3))
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