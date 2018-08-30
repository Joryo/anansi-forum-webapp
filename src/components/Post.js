import React from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    ButtonGroup,
    Button,
    CardHeader,
    Form,
    Input,
    FormFeedback,
} from 'reactstrap'
import Trash from 'react-icons/lib/io/trash-b';
import Edit from 'react-icons/lib/io/edit';
import Avatar from './Avatar.js';
import { Tag } from './Tag.js'
import { dateString } from '../helper.js'
import Comments from '../containers/Comments.js'
import PostStyle from '../styles/post.js'

// Post component - Display a port with his comments
const Post = ({
        commentsPage,
        status,
        post,
        tags,
        author,
        comments,
        me,
        onDeleteClick,
        onUpdateClick,
        values,
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        commentsCount,
    }) => (
    <div>
        {post &&
        <div>
            <Card style={PostStyle.post}>
                <CardBody>
                    <CardTitle>{post.attributes.title}
                        <div style={PostStyle.categories}>
                            {tags.map(tag =>
                                <Tag key={tag.id} tag={tag}/>
                            )}
                        </div>
                    </CardTitle>
                    <hr/>
                    <CardText>{post.attributes.text}</CardText>
                </CardBody>
                <CardFooter>
                    <Avatar member={author}/> {dateString(post.attributes['date-created'])}
                    { author.id === me.id &&
                        <ButtonGroup style={PostStyle.actions}>
                            <Button onClick={onUpdateClick}><Edit/></Button>
                            <Button color='danger' onClick={onDeleteClick}><Trash/></Button>
                        </ButtonGroup>
                    }
                </CardFooter>
            </Card>
            <Comments postId={post.id} page={commentsPage} commentsCount={commentsCount}/>
        </div>
        }
        <div style={PostStyle.commentForm}>
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <b>Ecrire un commentaire</b>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <Input
                                type="textarea"
                                id="text"
                                value={values.text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={errors.text ? true : false}
                            />
                            {errors.text &&
                                <FormFeedback>{errors.text}</FormFeedback>
                            }
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Avatar member={me}/>
                        <Button color='primary' style={PostStyle.sendComment}>Envoyer</Button>
                    </CardFooter>
                </Card>
            </Form>
        </div>
    </div>
)

export default Post
