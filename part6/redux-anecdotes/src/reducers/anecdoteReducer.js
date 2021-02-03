import anecdoteService from '../services/anecdotes'

export const submitAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.upvote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      return state.map(a => a.id === updatedAnecdote.id 
        ? updatedAnecdote
        : a)
    case 'NEW_ANECDOTE':
      return [...state, action.data]       
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer