import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { compose } from 'redux'
import * as Yup from 'yup'
import { query } from 'redux-bees'
import Api from '../Api.js'
import PostForm from '../components/PostForm.js'
import { alertMessage } from '../actions/alert'

const postWriteFormik = {
    mapPropsToValues: props => ({
        title: props.post ? props.post.attributes.title : '',
        text: props.post ? props.post.attributes.text : '',
        tags: props.post ? props.post.relationships.tags.data.map(
                (e) => {return {"value" : e.id, "type" : "tags"}}
            ) : false,
    }),
    enableReinitialize: true, // Get the props updated when query ended
    validationSchema: Yup.object().shape({
        title: Yup.string()
            .required('Un titre est nécessaire'),
        text: Yup.string()
            .required('Un texte est nécessaire'),
    }),
    handleSubmit: (
        values,
        {
          props,
          setSubmitting,
          setErrors
        }
    ) => {
        console.log(values.tags)
        Api.updatePost(
            {
                id: props.post.id,
            },
            {
                data:
                {
                    type: 'post',
                    id: props.post.id,
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
            },
        )
        .then((result) => {
            // Redirect to the updated post
            props.dispatch(alertMessage('success', 'Votre post à été mis à jour'))
            props.history.push('/post/' + result.body.data.id)
        }).catch(
            error => {
                props.dispatch(alertMessage('danger', 'Une erreur est survenue'))
            }
        )
    }
}

const mapStateToProps = () => ({
    update : true
})

const enhance = compose(
    query('post', Api.getPost, (perform, prop) => (
        perform({id: prop.match.params.id})
    )),
    connect(mapStateToProps),
    withFormik(postWriteFormik),
)

export default enhance(PostForm)
