import { useEffect } from "react"

const Notification = ({ notification, setNotification }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification({
                message: '',
                type: ''
            })
        }, 5000)
        return () => clearTimeout(timer)
    }, [notification])
    
    return (notification.message === '') 
        ? null
        : (
            <div>
                Info: {notification.message}
            </div>
        )
}

export default Notification