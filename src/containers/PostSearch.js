import { connect } from 'react-redux'
import querystring from 'querystring'
import PostSearch from '../components/PostSearch.js'
import Api from '../Api.js';
import { query } from 'redux-bees';
import { compose } from 'redux'
import { mapPostsAuthorAndTags } from '../libs/post.js'

const searchLimit = 10;

const mapStateToProps = (state, props) => {
    let queryString = querystring.parse(props.location.search.slice(1))

    var map = {
        posts : props.posts,
        history : props.history,
        activePage : props.match.params.page ? props.match.params.page -1 : 0,
        searchLimit : searchLimit,
        query: queryString.query ? queryString.query : false,
    }

    if (props.posts) {
        map.posts = mapPostsAuthorAndTags(map.posts, state)
    } else if (props.status.posts.hasStarted && !props.status.posts.isLoading) {
        // If the request is terminated but there is no result found (204)
        map.posts = []
    }

    return map
}

const enhance = compose(
    query('posts', Api.getPosts, (perform, prop) => {
        let page = prop.match.params.page ? prop.match.params.page -1 : 0
        let queryPerform = {
            include: 'author,tags',
            sort: '-date-created',
            'search[title]' : '',
            'page[limit]': searchLimit,
            'page[offset]': searchLimit * page,
        }
        let queryString = querystring.parse(prop.location.search.slice(1))
        if (queryString.query) {
            queryPerform['search[title]'] = queryString.query;
        }

        return (
            perform(queryPerform)
        )
    }),
    connect(mapStateToProps),
)

export default enhance(PostSearch)
