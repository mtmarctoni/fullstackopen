const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const res = await fetch(baseUrl)
    return await res.json()
}

export const createAnecdote = async (content) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content,
            votes: 0
        })
    })
    return await res.json()
}

export const voteAnecdote = async (id) => {
    const anecdotes = await getAll()
    let newVotes
    const anecdoteToVote = anecdotes.find(a => {
        newVotes = a.votes + 1
        return a.id === id
    })
    const updatedAnecdote = {
        ...anecdoteToVote, 
        votes: newVotes
    }
    
    const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote)
    })
    return await res.json()
}  