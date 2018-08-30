import React from 'react'
import { Card, CardText, CardTitle, CardFooter, CardBody} from 'reactstrap';
import { IndexLinkContainer } from 'react-router-bootstrap'
import PostsStyle from '../styles/posts.js'
import { commentString, dateString, resumeText } from '../helper.js'
import Avatar from './Avatar.js';
import { Tag } from './Tag.js'

// PostListItem component - Post list item
const PostListItem = ({post}) => (
    <IndexLinkContainer to={`/post/${ post.id }`} style={PostsStyle.post}>
        <Card>
            <CardBody>
                <CardTitle>{post.attributes.title}
                    <div style={PostsStyle.categories}>
                        {post.tags.map(tag =>
                            <Tag key={tag.id} tag={tag}/>
                        )}
                    </div>
                </CardTitle>
                <hr/>
                <CardText>{resumeText(post.attributes.text, 200)}</CardText>
            </CardBody>
            <CardFooter>
                <small><Avatar member={post.author} small/>{dateString(post.attributes['date-created'])}</small>
                <small> - {commentString(post.relationships.comments.data.length)}</small>
            </CardFooter>
        </Card>
    </IndexLinkContainer>
)

export default PostListItem
