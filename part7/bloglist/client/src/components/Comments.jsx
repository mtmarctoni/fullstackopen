import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { commentBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const Comments = ({isLogged}) => {
    const dispatch = useDispatch()
    const blogId = useParams().id
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
    const loginUser = useSelector(state => state.loginUser)
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (blog) setComments(blog.comments)
    }, [blog])

    const handleAddComment = async (e) => {
        e.preventDefault()
        const content = e.target.comment.value

        try {
            const newComment = await dispatch(commentBlog(blogId, content, loginUser.token))
            e.target.comment.value = ''
            setComments([...comments, newComment])
            dispatch(createNotification(
                `You commented: ${newComment.content}`,
                'success', 5
            ))
        } catch (err) {
            dispatch(createNotification(
                'Comment failed',
                'error', 5
            ))
        }
    }

    const parseDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        return new Date(date).toLocaleString('es-ES', options)
    }
    

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Comments</h3>
            <form className={`${isLogged ? 'block' : 'hidden'} mb-4`} onSubmit={handleAddComment}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="relative">
                            <textarea
                                name="comment"
                                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded lg:text-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                placeholder="Your comment"
                                rows="4"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 md:mb-0">
                        <button
                            type="submit"
                            className="shadow bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 text-white font-medium rounded text-sm px-4 py-2"
                        >
                            Add comment
                        </button>
                        </div>
                    </div>
            </form>
            <ul className="list-disc pl-5">
                {
                    comments.length !== 0
                    ? comments.map(comment => (
                        <li key={comment.id} className="text-gray-700 mb-1">{comment.content} - {parseDate(comment.date)}</li>
                    ))
                    : <p className="text-gray-600 mb-6">No comments yet</p>
                } 
            </ul>
        </div>
    )
}

export default Comments