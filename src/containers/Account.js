import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import Api from '../Api.js'
import Account from '../components/Account.js'
import { reloadToken, logout} from '../actions/auth'
import { alertMessage } from '../actions/alert'

const mapStateToProps = state => ({
    pseudo: state.auth.me.attributes.pseudo,
    email: state.auth.me.attributes.email,
    id: state.auth.me.id,
    deleteAction: false,
})

const mapDispatchToProps = (dispatch, props) => ({
    // There is two button for the same form, we need to know wich one was clicked
    onFormSend: (action, values, handleSubmit, e) => {
        values.action= action;
        handleSubmit(e)
    },
    dispatch: dispatch
})

// Update and delete member actions, depends on the form button clicked
const actions = {
    update : async (props, values, setErrors) => {
        var formAttributes = {
            pseudo: values.pseudo,
            email: values.email,
        }
        if (values.newPassword !== ''){
            formAttributes.password = values.newPassword
        }
        return Api.updateMember(
            {
                id: props.id,
            },
            {
                data:
                {
                    type: 'member' ,
                    attributes: formAttributes,
                    id: props.id,
                }
            }
        )
        .then(result => {
            // Reload the JWT token after update success
            let password = typeof(values.newPassword) !== 'undefined' ? values.newPassword : values.password
            reloadToken(formAttributes.email, password, props.dispatch)
            .then(token => {
                props.dispatch(alertMessage('success', 'Vos données ont bien été mise à jour'))
                return token;
            })
            .catch(error => {
                props.dispatch(logout())
                throw new Error('Echec lors de la récupération des données')
            })
        }).catch(
            error => {
                throw new Error('Echec lors de la mise à jour du compte')
            }
        )
    },
    delete : async (props, values, setErrors) => {
        if (window.confirm('Êtes-vous sûre de vouloir supprimer votre compte ?')) {
            return Api.deleteMember(
                {
                    id: props.id,
                }
            )
            .then(result => {
                props.dispatch(logout())
                return
            }).catch(
                error => {
                    throw new Error('Echec lors de la suppression du compte')
                }
            )
        }
    }
}

const accountFormik = {
    mapPropsToValues: props => ({
        pseudo: props.pseudo,
        email: props.email,
        password: '',
        passwordConfirmation: '' }
    ),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Adresse email invalide'),
        password: Yup.string()
            .required('Votre mot de passe actuel est nécessaire pour effectuer des modifications'),
        newPassword: Yup.string(),
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
        var action = 'update';
        if(values.action === 'delete') {
            action = 'delete'
        }
        // Check the actual password before trying to update the member
        reloadToken(props.email, values.password, props.dispatch)
        .then(token => {
            return actions[action](props, values, setErrors)
        })
        .catch(error => {
            props.dispatch(alertMessage('danger', "Mauvais mot de passe actuel"))
        })
    }
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFormik(accountFormik),
)

export default enhance(Account)
