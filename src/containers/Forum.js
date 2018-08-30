import React from 'react'
import { connect } from 'react-redux'
import Header from '../containers/Header.js'
import Posts from '../containers/Posts.js'
import Post from '../containers/Post.js'
import Alert from '../containers/Alert.js'
import PostCreate from '../containers/PostCreate.js'
import PostUpdate from '../containers/PostUpdate.js'
import PostSearch from '../containers/PostSearch.js'
import Account from '../containers/Account.js'
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import ForumStyle from '../styles/forum.js'

// Main content for logged member
const Forum = () => {
    return (
        <div className="Forum">
            <Header />
            <Alert />
            <Container style={ForumStyle.content}>
                <Route exact path="/" component={Posts} />
                <Route exact path="/posts" component={Posts}/>
                <Route exact path="/posts/:page" component={Posts}/>
                <Route exact path="/account" component={Account} />
                <Route exact path="/search" component={PostSearch} />
                <Route exact path="/search/:page" component={PostSearch} />
                <Switch>
                    <Route exact path="/post/create" component={PostCreate} />
                    <Route exact path="/post/update/:id" component={PostUpdate} />
                    <Route exact path="/post/:id" component={Post} />
                    <Route exact path="/post/:id/:page" component={Post} />
                </Switch>
            </Container>
        </div>
    )
}

export default connect()(Forum)
