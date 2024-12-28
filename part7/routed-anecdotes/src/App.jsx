import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useMatch, useParams } from 'react-router-dom'

import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState({message: '', type: ''})
  
  const matchAnecdote = useMatch('/anecdotes/:id')
 
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  
  const anecdoteById = (id) => anecdotes.find(a => a.id === id)
  
  const vote = (id) => {
    const anecdote = anecdoteById(id)
    
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  
  const anecdote = matchAnecdote
    ? anecdoteById(Number(matchAnecdote.params.id))
    : null

  return (
    <div>
        <h1>Software anecdotes</h1>
      <Menu notification={notification} setNotification={setNotification} />
      <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
  
//<AnecdoteList anecdotes={anecdotes} />
//<About />
//<CreateNew addNew={addNew} />