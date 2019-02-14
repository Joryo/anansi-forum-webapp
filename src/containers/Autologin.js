import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { checkToken } from '../actions/auth'
import { alertMessage } from '../actions/alert'

const mapDispatchToProps = (dispatch, props) => {
    if (props.match.params.token) {
        checkToken(props.match.params.token, dispatch)
        .then(()=> {
            props.history.push('/account')
        })
        .catch(
            error => {
                props.history.push('/')
                dispatch(alertMessage('danger', error))
            }
        )
    }

    return {}
}

const enhance = compose(
    connect(
        null,
        mapDispatchToProps
    )
)

// Main content for logged member
const Autologin = () => {
    return (
        <div className="Autologin">
            <p> Connexion en cours </p>
        </div>
    )
}

export default enhance(Autologin)