import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import Login from '../components/Login.js'
import { reloadToken} from '../actions/auth'

const loginFormik = {
    mapPropsToValues: props => ({ email: '', password: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Adresse email invalide')
            .required('Un email est nécessaire'),
        password: Yup.string()
            .required('Un mot de passe est nécessaire'),
    }),
    handleSubmit: (
        values,
        {
          props,
          setSubmitting,
          setErrors
        }
    ) => {
        reloadToken(values.email, values.password, props.dispatch)
        .then(token => {})
        .catch(
            error => {
                setErrors({email: error})
            }
        )
    }
}

const enhance = compose(
    connect(),
    withFormik(loginFormik),
)

export default enhance(Login)
