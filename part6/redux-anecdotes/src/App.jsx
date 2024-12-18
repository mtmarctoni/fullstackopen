import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    //We use a thunk function in anecdoteReducer to initialize the state with data from the API
    dispatch(initializeAnecdotes())
    //const fetchData = async () => {
    //  const anecdotes = await getAll()
    //  dispatch(setAnecdotes(anecdotes))
    //}
    //fetchData()
  }, [])
  


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App