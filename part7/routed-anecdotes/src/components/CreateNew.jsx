import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useField } from "../hooks/index"

const CreateNew = ({addNew, setNotification}) => {
    //const [content, setContent] = useState('')
    //const [author, setAuthor] = useState('')
    //const [info, setInfo] = useState('')
    const { reset: resetContent, ...content } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetInfo, ...info } = useField('text')
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author : author.value,
            info : info.value,
            votes: 0
        })
        reset()
        navigate('/')
        setNotification({
            message: `New anecdote created: ${content} by ${author}`,
            type: 'success'
        })
    }

    const reset = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
            <div>
                content
                <input {...content} />
            </div>
            <div>
                author
                <input {...author} />
            </div>
            <div>
                url for more info
                <input {...info} />
            </div>
            <button>create</button>
        </form>
      </div>
    )
    
}

export default CreateNew

//<input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
//< input name = 'author' value = { author } onChange = {(e) => setAuthor(e.target.value)} />
//<input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />