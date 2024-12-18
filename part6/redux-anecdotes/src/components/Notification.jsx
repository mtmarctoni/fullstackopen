import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"

const Notification = () => {
  const notification = useSelector(state => state.notificationReducer)
  //const dispatch = useDispatch()

  //useEffect(() => {
  //  const timer = setTimeout(() => {
  //    dispatch(clearNotification())
  //  }, 5000)
  //  return ()=> clearTimeout(timer)
  //}, [notification])
  
  if (notification.message === '') return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification