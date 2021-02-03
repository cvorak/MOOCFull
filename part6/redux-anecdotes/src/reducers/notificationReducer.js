export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            text    
        })
        
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'        
            })
        }, time * 1000)
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.text
        case 'REMOVE_NOTIFICATION':
            return ''
        default: 
            return state
    }
}

export default reducer