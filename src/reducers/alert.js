// Navigation bar reducer
const alert = (state = [], action) => {
    switch (action.type) {
        case 'ALERT_MESSAGE':
            return Object.assign({}, state, {
                type: action.alert_type,
                message: action.message,
            })
        case 'ALERT_CLEAR':
            return {}
        default:
            return state
    }
}

export default alert
