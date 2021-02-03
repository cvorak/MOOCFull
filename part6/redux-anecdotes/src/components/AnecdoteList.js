import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      const upvotedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      dispatch(voteAnecdote(upvotedAnecdote))
      dispatch(setNotification(`you voted ${upvotedAnecdote}`))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <>
        {
            anecdotes
                .filter(a => a.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default AnecdoteList
