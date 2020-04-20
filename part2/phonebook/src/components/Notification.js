import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
        
    return (
        <div className={message.type === 'error' ? 'notification error' : 'notification'} >
            {message.text}
        </div>
    )
}

export default Notification