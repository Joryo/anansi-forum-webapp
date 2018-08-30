import Api from '../Api.js';

export const deletePost = (id, history, dispatch) => {
    Api.destroyPost({id: id})
    .then(
        result => {
            // Redirect to the created post
            dispatch(deletePostSuccess())
            history.push('/')
    }).catch(
        error => {
            dispatch(deletePostFail())
        }
    )
}

export const deletePostSuccess = () => {
  return {
    type: 'DELETE_POST_SUCCESS',
  }
}

export const deletePostFail = () => {
  return {
    type: 'DELETE_POST_FAIL',
  }
}

export const updatePost = (id, history) => {
  history.push('/post/update/' + id)
  return {
    type: 'UPDATE_POST',
    id: id,
  }
}
