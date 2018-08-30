import { connect } from 'react-redux'
import { query, getRelationship } from 'redux-bees'
import { compose } from 'redux'
import Comments from '../components/Comments.js'
import Api from '../Api.js'
import { deletedMember } from '../helper.js'

const COMMENTS_LIMIT = 10

const mapStateToProps = (state, props) => {
    var map = {
        comments: props.comments,
        me: state.auth.me,
        activePage: props.page,
        commentsLimit : COMMENTS_LIMIT,
        commentsCount : props.commentsCount,
        postId: props.postId,
    }

    // Add the author on each comments
    if (props.comments) {
        map.comments.map(
            (comment) => {
                var commentAuthor = getRelationship(state, comment, 'author')
                if (!commentAuthor) {
                    return comment.author = deletedMember
                }
                return comment.author = commentAuthor
            }
        )
    }

    return map
}

const enhance = compose(
    query('comments', Api.getPostComments, (perform, prop) => {
        return perform({
            id: prop.postId,
            include: 'author',
            sort: 'date-created',
            'page[limit]': COMMENTS_LIMIT,
            'page[offset]': COMMENTS_LIMIT * prop.page
        })
    }),
    connect(
        mapStateToProps
    ),
)

export default enhance(Comments)
