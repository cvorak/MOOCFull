import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Anecdote = ({ headerText, anecdote, votes }) => {
    return (
        <>
            <h1>{headerText}</h1>
            <div>
                {anecdote}
            </div>
            <div>
                has {votes} votes
        </div>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

    const handleClick = () => {
        const index = Math.floor(Math.random() * props.anecdotes.length)
        setSelected(index)
    }

    const handleVote = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)
    }

    return (
        <>
            <Anecdote
                headerText={'Anecdote of the day'}
                anecdote={props.anecdotes[selected]}
                votes={votes[selected]}
            />
            <div>
                <Button handleClick={handleVote} text={'vote'} />
                <Button handleClick={handleClick} text={'next anecdote'} />
            </div>

            <Anecdote
                headerText={'Anecdote with most votes'}
                anecdote={props.anecdotes[votes.indexOf(Math.max(...votes))]}
                votes={votes[votes.indexOf(Math.max(...votes))]}
            />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)