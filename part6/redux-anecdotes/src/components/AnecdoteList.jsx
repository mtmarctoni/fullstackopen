import { useDispatch, useSelector } from "react-redux"
import { voteAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationThunk } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdoteReducer, filterReducer }) => {
        if (filterReducer === '') {
            return anecdoteReducer
        } else {
            return anecdoteReducer.filter(anecdote => anecdote.content.toLowerCase().includes(filterReducer.toLowerCase()))
        }
    })
    const dispatch = useDispatch()
    
    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdoteThunk(id))
        //voteAnecdote(id)
        //dispatch(vote(id))
        dispatch(setNotificationThunk({
            message: `You voted for anecdote: ${anecdotes.find(anecdote => anecdote.id === id).content}`,
            type: 'success'
        }, 5))
      }
    
    const anecdotesToShow = [...anecdotes].sort((a, b) => b.votes - a.votes)
    
    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList