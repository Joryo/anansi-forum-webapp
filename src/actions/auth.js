import Api from '../Api.js'

export const login = token => {
  return {
    type: 'SET_JWT_TOKEN',
    token
  }
}

export const logout = () => {
  return {
    type: 'UNSET_JWT_TOKEN',
  }
}

export const reloadToken = (email, password, dispatch) => {
    return new Promise((resolve, reject) => {
        Api.getJwtToken(
            {
                "email": email,
                "password": password
            }
        ).then(
            result => {
                dispatch(login(result.body.data.token))
                resolve()
            }
        ).catch(
            error => {
                reject('Mauvais login ou mot de passe')
            }
        )
    })
}


