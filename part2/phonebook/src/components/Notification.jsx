const Notification = ({ notification }) => {
    //console.log(notification)    
    const { message, type } = notification
    let messageStyle
    
    if (message === null) return null
    
    if (type === 'success') {
        messageStyle = {
            color: 'green',
            fontSize: 16,
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
            paddingLeft: 20,
        }
    }
    if (type === 'error') {
        messageStyle = {
            color: 'red',
            fontSize: 16,
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
            paddingLeft: 20,
        }
    }
    if (type === 'warning') {
        messageStyle = {
            color: 'orange',
            fontSize: 16,
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
            paddingLeft: 20,
        }
    }
    

    return (
        <div style={messageStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification