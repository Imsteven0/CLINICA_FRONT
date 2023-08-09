import jwtDecode from 'jwt-decode'

export const getFullName = token => {
    const {name} = jwtDecode(token)
    return name
}

export const getIdUser = token => {
    const {user_id} = jwtDecode(token)
    return user_id
}

export const getExpiresIn = token => {
    const {exp} = jwtDecode(token)
    return exp
}

export const getImageUser = token => {
    const {image} = jwtDecode(token)
    return image
}