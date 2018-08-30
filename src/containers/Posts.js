import { connect } from 'react-redux'
import Posts from '../components/Posts.js'
import Api from '../Api.js';
import { query } from 'redux-bees';
import { compose } from 'redux'
import store from '../store.js'
import { mapPostsAuthorAndTags } from '../libs/post.js'

const postsLimit = 10;

const mapStateToProps = (state, props) => {
    var map = {
        posts : props.posts,
        activePage : props.match.params.page ? props.match.params.page -1 : 0,
        postsLimit : postsLimit,
        history : props.history,
    }

    if (props.posts) {
        map.posts = mapPostsAuthorAndTags(map.posts, state)
        map.postsCount = props.status.posts.meta.count
    }

    return map
}

const enhance = compose(
    query('posts', Api.getPosts, (perform, prop) => {
        let filters = store.store.getState().filters;
        let page = prop.match.params.page ? prop.match.params.page -1 : 0
        return (
            perform({
                include: 'author,tags',
                sort: '-date-created',
                'filter[tags]' : filters,
                'page[limit]': postsLimit,
                'page[offset]': postsLimit * page })
        )
    }),
    connect(mapStateToProps),
)

export default enhance(Posts)
