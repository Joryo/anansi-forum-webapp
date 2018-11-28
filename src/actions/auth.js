import Api from '../Api.js'
import jwtDecode from 'jwt-decode';

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

export const checkToken = (token, dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            const decoded_token = jwtDecode(token)
            if (!decoded_token.member) {
                throw Error();
            }
            dispatch(login(token))
            resolve()
        } catch (error) {
            reject('Token de connexion invalide')
        }
    })
}

export const lostPassword = (email, dispatch) => {
    return new Promise((resolve, reject) => {
        Api.lostPassword(
            {
                "email": email,
                "subject": "Reconnectez vous sur le forum Anansi",
                "text": "Suivez ce lien pour vous connecter sur le forum Anansi et changez votre mot de passe:",
                "redirect_url": process.env.REACT_APP_API_URL + '/autologin/',
                "redirect_label": "Je me connecte"
            }
        ).then(
            () => {
                resolve()
            }
        ).catch(
            error => {
                reject('Une erreur est survenue')
            }
        )
    })
}


