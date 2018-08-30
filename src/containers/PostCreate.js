import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import Api from '../Api.js'
import PostForm from '../components/PostForm.js'
import { alertMessage } from '../actions/alert'

const postWriteFormik = {
    mapPropsToValues: props => ({ title: '', text: '', tags: []}),
    validationSchema: Yup.object().shape({
        title: Yup.string()
            .required('Un titre est nécessaire'),
        text: Yup.string()
            .required('Un texte est nécessaire'),
        tags: Yup.array()
    }),
    handleSubmit: (
        values,
        {
          props,
          setSubmitting,
          setErrors
        }
    ) => {
        Api.createPost(
            {
                data:
                {
                    type: 'post',
                    attributes:
                    {
                        "title": values.title,
                        "text": values.text,
                    },
                    relationships: {
                        "tags" : {
                            "data" : values.tags.map((e) => {return {"id" : e.value, "type" : "tags"}})
                        }
                    }
                }
            }
        )
        .then((result) => {
            // Redirect to the created post
            props.dispatch(alertMessage('success', 'Votre sujet vient d\'être créé'))
            props.history.push('/post/' + result.body.data.id)
        }).catch(
            error => {
                props.dispatch(alertMessage('danger', 'Une erreur est survenue'))
            }
        )
    }
}

const enhance = compose(
    connect(),
    withFormik(postWriteFormik),
)

export default enhance(PostForm)
