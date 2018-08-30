import { getRelationship } from 'redux-bees';
import { deletedMember } from '../helper.js'

/**
 *  Link author and tags data to a post collection
 */
const mapPostsAuthorAndTags = (posts, state) => {
    if (!Array.isArray(posts)) {
        posts = [posts]
    }

    return posts.map(
        (post) => {
            var postAuthor = getRelationship(state, post, 'author')
            if (!postAuthor) {
                post.author = deletedMember
            } else (
                post.author = postAuthor
            )

            post.tags = getRelationship(state, post, 'tags')

            return post
        }
    )
}

export {mapPostsAuthorAndTags}
