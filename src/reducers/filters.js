// Filter reducer
const filters = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            state.indexOf(action.tagId) === -1 ?
                state.push(action.tagId)
                :
                state.splice(state.indexOf(action.tagId), 1)
            return state
        default:
            if (!state.length)
                return []
            else
                return state
    }
}

export default filters
