import React from 'react'

const Notification = ({message}) => {
        if (message === null) {
        return null;
    }
    return (
        <div className={message.substring(0, 3) === 'The' ? 'notification error' : 'notification'} >
            {message}
        </div>
    )
}

export default Notification