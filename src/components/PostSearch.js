import React from 'react'
import Icon from 'react-icons-kit'
import { frownO } from 'react-icons-kit/fa/'
import PostsStyle from '../styles/posts.js'
import LightPagination from "./LightPagination.js";
import PostListItem from './PostListItem.js'

// PostSearch component - Display a list of post with their link on a query result
const PostSearch = ({ posts, status, query, activePage, searchLimit, history, match, postsCount}) => {
    return (
    <div>
        <h3> Résultat(s) pour : {query} </h3>
        <hr/>
        { posts &&
            <div>
                { !posts.length &&
                    <div style={PostsStyle.noPosts}>
                        <Icon icon={frownO} size={200}/>
                        { activePage > 1 ? (
                            <p>Oups... Aucun nouveau résultat</p>
                        ) : (
                            <p>Oups... Aucun résultat trouvé</p>
                        )}
                    </div>
                }
                {posts.map(post =>
                    <PostListItem key={post.id} post={post}/>
                )}
                <LightPagination
                    activePage={activePage}
                    itemsCount={posts.length}
                    itemsCountPerPage={searchLimit}
                    link='search'
                    query={ '?query=' + query}
                />
            </div>
        }
    </div>
)}

export default PostSearch
