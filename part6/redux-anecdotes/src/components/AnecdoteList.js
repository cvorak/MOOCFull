import React from 'react'
import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
    const vote = (anecdote) => {
      const upvotedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      props.voteAnecdote(upvotedAnecdote)
      props.setNotification(`you voted ${anecdote.content}`, 2)
    }

    return (
        <>
        {
            props.anecdotes
                .filter(a => a.content.includes(props.filter))
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,    
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
