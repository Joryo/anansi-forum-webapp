import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import Api from '../Api.js'
import Account from '../components/Account.js'
import { logout} from '../actions/auth'
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
            // The token need to be reload. Send to login page
            props.dispatch(logout())
            props.dispatch(alertMessage('success', "Veuillez vous reconnecter pour valider les modifications."))
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

        return actions[action](props, values, setErrors)
    }
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFormik(accountFormik),
)

export default enhance(Account)
