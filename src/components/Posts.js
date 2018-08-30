import React from 'react'
import Icon from 'react-icons-kit'
import { frownO } from 'react-icons-kit/fa/'
import PostsStyle from '../styles/posts.js'
import Pagination from "./Pagination.js";
import Categoriesfilter from '../containers/CategoriesFilter.js'
import PostListItem from './PostListItem.js'

// Posts component - Display a list of post with their link
const Posts = ({ posts, status, history, match, activePage, postsLimit, postsCount}) => {
    return (
    <div>
        <Categoriesfilter/>
        <hr/>
        { posts &&
            <div>
                { !posts.length &&
                    <div style={PostsStyle.noPosts}>
                        <Icon icon={frownO} size={200}/>
                        <p>Oups... Aucun sujets à afficher</p>
                    </div>
                }
                {posts.map(post =>
                    <PostListItem key={post.id} post={post}/>
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={postsLimit}
                    totalItemsCount={postsCount}
                    link='posts'
                />
            </div>
        }
    </div>
)}

export default Posts
