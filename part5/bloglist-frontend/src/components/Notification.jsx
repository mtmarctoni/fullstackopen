const Notification = ({ notification }) => {
  //console.log(notification)
  const { message, type } = notification

  if (message === null) return null

  let messageStyle = {
    color: type === 'success' ? 'green' : type === 'error' ? 'red' : 'yellow' ,
    fontSize: 16,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    paddingLeft: 20,
  }

  return (
    <div style={messageStyle}>
      <p>{message}</p>
    </div>
  )
}

export default Notification