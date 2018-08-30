let jwtDecode = require('jwt-decode');

// Authentification reducer 
const auth = (state = [], action) => {
    switch (action.type) {
        case 'SET_JWT_TOKEN':
            return Object.assign({}, state, {
                token: action.token,
                me: jwtDecode(action.token).member
            })
        case 'UNSET_JWT_TOKEN':
            return {}
        default:
            return state
    }
}

export default auth
