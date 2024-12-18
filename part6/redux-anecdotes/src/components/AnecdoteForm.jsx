import { useDispatch } from "react-redux"
import { createAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationThunk } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleCreate = (e) => {
        e.preventDefault()
        const content = e.target.anecdoteInput.value
        // the add() function dispatch will handle the communication with the server
        //createAnecdote(content)
        dispatch(createAnecdoteThunk(content))
        dispatch(setNotificationThunk({
            message: `Added anecdote: ${content}`,
            type: 'success'
        }, 5))
    }
    
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div><input name="anecdoteInput"/></div>
          <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm