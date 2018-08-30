import React from 'react'
import { ListGroup, ListGroupItem, Media } from 'reactstrap'
import Avatar from './Avatar.js'
import Pagination from "./Pagination.js"
import { commentString, dateString } from '../helper.js'
import PostStyle from '../styles/post.js'



// Comment component - Display a comments list
const Comments = ({
    activePage,
    postId,
    commentsLimit,
    commentsCount,
    comments,
    me,
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange
}) => (
    <div>
        {comments &&
            <div>
                <div style={PostStyle.commentsHeader}>
                    <h5 color="secondary">
                        {commentString(commentsCount)}
                    </h5>
                </div>
                <hr/>
                <ListGroup style={PostStyle.comments}>
                    {comments.map(comment =>
                        <ListGroupItem
                            key={comment.id}>
                            <Media>
                                <Media body>
                                    <small>
                                        <Avatar
                                            small
                                            member={comment.author}
                                        />
                                         {dateString(comment.attributes['date-created'])}
                                    </small>
                                    <br/>
                                    <br/>
                                    {comment.attributes.text}
                                </Media>
                            </Media>
                        </ListGroupItem>
                    )}
                </ListGroup>
                <br/>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={commentsLimit}
                    totalItemsCount={commentsCount}
                    link={'post/' + postId}
                />
            </div>
        }
    </div>
)

export default Comments
