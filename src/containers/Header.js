import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { toggle } from '../actions/navbar'
import Header from '../components/Header'

const mapStateToProps = state => ({
    pseudo: state.auth.me.attributes.pseudo,
    isOpen: state.navbar.isOpen
})

const mapDispatchToProps = dispatch => ({
    onLogoutClick: () => {
        dispatch(logout())
    },
    toggle: () => dispatch(toggle()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
