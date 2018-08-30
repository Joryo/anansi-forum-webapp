import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { query, getRelationship } from 'redux-bees';
import { compose } from 'redux'
import Post from '../components/Post.js'
import { deletePost, updatePost } from '../actions/post.js'
import Api from '../Api.js';
import { alertMessage } from '../actions/alert'
import { deletedMember } from '../helper.js'

const mapStateToProps = (state, props) => {
    var map = {
        author: getRelationship(state, props.post, 'author'),
        tags: getRelationship(state, props.post, 'tags'),
        me: state.auth.me,
        commentsPage: props.match.params.page ? props.match.params.page - 1 : 0,
        commentsCount: props.post ? props.post.relationships.comments.data.length : 0,
    }

    // If author doesn't exist (deleted for example), we display fake author
    if (!map.author) {
        map.author = deletedMember
    }

    return map
}

const mapDispatchToProps = (dispatch, props) => ({
    onDeleteClick: () => {
        if (window.confirm('Êtes-vous sûre de vouloir supprimer ce post ?')) {
            dispatch(deletePost(props.match.params.id, props.history, dispatch))
        }
    },
    onUpdateClick: () => {
        dispatch(updatePost(props.post.id, props.history))
    },
})

const commentWriteFormik = {
    mapPropsToValues: props => ({text: '' }),
    validationSchema: Yup.object().shape({
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
        Api.createComment(
            {
                data:
                {
                    type: 'comment',
                    attributes:
                    {
                        "post": props.match.params.id,
                        "text": values.text,
                    }
                }
            }
        )
        .then((result) => {
            props.history.push('/post/' + props.match.params.id + '/' + (props.commentsPage + 1))
            props.dispatch(alertMessage('success', "Votre commentaire a été ajouté"))
        }).catch(
            error => {
                props.dispatch(alertMessage('danger', "Echec de l'ajout du commentaire"))
            }
        )
    }
}

const enhance = compose(
    query('post', Api.getPost, (perform, prop) => (
        perform({id: prop.match.params.id, include: 'author,tags' })
    )),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withFormik(commentWriteFormik)
)

export default enhance(Post)
