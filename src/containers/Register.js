import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import Api from '../Api.js'
import Register from '../components/Register.js'
import { login as loginAction} from '../actions/auth'

const registerFormik = {
    mapPropsToValues: props => ({ pseudo: '', email: '', password: '', passwordConfirmation: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Adresse email invalide')
            .required('Un email est nécessaire'),
        password: Yup.string()
            .required('Un mot de passe est nécessaire'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Les mot de passes de correspondent pas')
            .required('La confirmation du mot de passe est nécessaire'),
        pseudo: Yup.string()
            .required('Un pseudo est nécessaire'),
    }),
    handleSubmit: (
        values,
        {
          props,
          setSubmitting,
          setErrors
        }
    ) => {
        Api.createMember(
            {
                data:
                {
                    type: 'member' ,
                    attributes:
                    {
                        "email": values.email,
                        "password": values.password,
                        "pseudo" : values.pseudo,
                    }
                }
            }
        )
        .then(result => {
            // Put the jwt token in redux state and redirect home
            props.dispatch(loginAction(result.body.data.meta.token))
            props.history.push('/home');
        }).catch(
            error => {
                setErrors({title: 'Echec lors de l\'enregistrement du compte'})
            }
        )
    }
}

const enhance = compose(
    connect(),
    withFormik(registerFormik),
)

export default enhance(Register)
