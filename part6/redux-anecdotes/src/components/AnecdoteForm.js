import React from 'react'
import {useDispatch} from 'react-redux'
import {submitAnecdote} from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


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
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(submitAnecdote(newAnecdote))
        dispatch(setNotification(`you posted: ${newAnecdote.content}`))
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