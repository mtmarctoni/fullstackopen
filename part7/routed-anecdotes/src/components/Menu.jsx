import { Link } from "react-router-dom"

import Notification from './Notification'

const Menu = ({notification, setNotification}) => {
    const padding = {
      paddingRight: 5
    }
    return (
        <header>
            <div>
                <Link to='/about' style={padding}>About</Link>
                <Link to='/' style={padding}>Anecdotes</Link>
                <Link to='/create' style={padding}>Create New</Link>
            </div>
            <div>
                <Notification notification={notification} setNotification={setNotification} />
            </div>
      </header>
    )
}

export default Menu

//< a href = '#' style = { padding } > anecdotes</a >
//<a href='#' style={padding}>create new</a>
//<a href='#' style={padding}>about</a>