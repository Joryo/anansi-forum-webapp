import { buildApi, get, post, patch, destroy } from 'redux-bees';
import store from './store.js';

// Api routes
const apiEndpoints = {
    getPosts: { method: get, path: '/posts' },
    getPost: { method: get, path: '/posts/:id' },
    getPostComments: { method: get, path: '/posts/:id/comments' },
    createPost: { method: post, path: '/posts' },
    updatePost: { method: patch, path: '/posts/:id' },
    destroyPost: { method: destroy, path: '/posts/:id' },
    getJwtToken: { method: post, path: '/auth' },
    createComment: { method: post, path: '/comments' },
    createMember: { method: post, path: '/members' },
    updateMember: { method: patch, path: '/members/:id' },
    deleteMember: { method: destroy, path: '/members/:id' },
    getTags : { method: get, path: '/tags' },
    lostPassword : {method: post, path: '/lostpassword'},
};

// Api configuration
const config = {
    baseUrl: process.env.REACT_APP_API_URL,
    configureHeaders(headers) {
        if (typeof (store.store.getState().auth) !== 'undefined') {
            return {
                ...headers,
                'Authorization': `Bearer ${store.store.getState().auth.token}`,
            };
        } else {
            return {
                ...headers
            };
        }
    },
};

const Api = buildApi(apiEndpoints, config);

export default Api;
