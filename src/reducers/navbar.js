// Navigation bar reducer
const navbar = (state = [], action) => {
    switch (action.type) {
        case 'TOGGLE':
            return Object.assign({}, state, {
                isOpen: !state.isOpen,
            })
        default:
            return Object.assign({}, state, {
                isOpen: false,
            })
    }
}

export default navbar
