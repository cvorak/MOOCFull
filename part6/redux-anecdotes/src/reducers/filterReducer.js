export const updateFilter = filter => {
    return {
        type: 'FILTER_UPDATED',
        filter
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER_UPDATED':
            return action.filter
        default:
            return state
    }
}

export default reducer