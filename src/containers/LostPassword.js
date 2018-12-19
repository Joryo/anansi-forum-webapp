import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import LostPassword from '../components/LostPassword.js'
import { lostPassword} from '../actions/auth'
import { alertMessage } from '../actions/alert'

const lostPasswordFormik = {
    mapPropsToValues: props => ({ email: ''}),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Adresse email invalide')
            .required('Un email est nécessaire'),
    }),
    handleSubmit: (
        values,
        {
          props,
          setSubmitting,
          setErrors
        }
    ) => {
        lostPassword(values.email, props.dispatch)
        .then(() => {
            props.history.push('/')
            props.dispatch(alertMessage('success', "Un email vous a été envoyé"))
        })
        .catch(
            error => {
                setErrors({email: error})
            }
        )
    }
}

const enhance = compose(
    connect(),
    withFormik(lostPasswordFormik),
)

export default enhance(LostPassword)
