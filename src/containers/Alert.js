import { connect } from 'react-redux'
import { clear } from '../actions/alert'
import Alert from '../components/Alert'

const mapStateToProps = state => ({
    message: state.alert.message,
    type: state.alert.type,
    isVisible : state.alert.message ? true : false
})

const mapDispatchToProps = (dispatch, props) => ({
    onDismiss: () => {
        dispatch(clear())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert)
