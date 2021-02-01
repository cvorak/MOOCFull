const initialNotification = 'test notification'

export const submitNotification = (text) => {
    return {
        type: 'NOTIFICATION',
        text
    }
}

const reducer = (state = initialNotification, action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.text
        default: 
            return state
    }
}

export default reducer