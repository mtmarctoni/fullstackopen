import { type Notification } from "../types";

const NotificationInfo = ({ notification }: { notification: Notification }) => {
    const { message, type } = notification;
    if (!message || type === '') return null;

    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green',
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    };
    
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default NotificationInfo;