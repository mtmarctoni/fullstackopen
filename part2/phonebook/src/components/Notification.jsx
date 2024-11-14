const Notification = ({ notification }) => {
    console.log(notification)
    
    const { message, type } = notification
    let messageStyle
    
    if (message === null) return null
    
    if (type === 'addContact') {
        messageStyle = {
            color: 'green',
            fontSize: 16,
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
        }
    }
    if (type === 'deleteContact') {
        messageStyle = {
            color: 'red',
            fontSize: 16,
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
        }
    }
    

    return (
        <div style={messageStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification