import React from 'react'
import { connect } from 'react-redux'
import { submitAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = {
            content: anecdoteText,
            votes: 0
        }
        props.submitAnecdote(anecdote)
        props.setNotification(`you posted: ${anecdote.content}`, 3)
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

const mapDispatchToProps = {
    submitAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm