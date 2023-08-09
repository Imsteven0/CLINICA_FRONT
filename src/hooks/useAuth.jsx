import {createContext, useContext, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocalStorage} from './useLocalStorage'
import {getExpiresIn, getFullName, getIdUser, getImageUser} from '../helpers/decoding' //Portafolio-Steven/src/helpers/decoding
import {Toastify} from '../utilities/Toastify';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage('token', null)
    const [user, setUser] = useLocalStorage('user', null)
    const [userImage, setUserImage] = useLocalStorage('image', null)
    const [idUser, setIdUser] = useLocalStorage('idUser', null)
    const [expiresIn, setExpiresIn] = useLocalStorage('expiresIn', null)

    const navigate = useNavigate()

    const login = async (token) => {
        setToken(token)
        setUser(getFullName(token))
        setUserImage(getImageUser(token))
        setIdUser(getIdUser(token))
        setExpiresIn(getExpiresIn(token))
        navigate('/', {replace: true})
        Toastify('success', `Se ha iniciado sesión correctamente!`);
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        setIdUser(null)
        setUserImage(null)
        setExpiresIn(null)
        navigate('/login', {replace: true})
        Toastify('success', 'Se ha cerrado la sesión');
    }

    const value = useMemo(
        () => ({
            token,
            user,
            idUser,
            userImage,
            setIdUser,
            expiresIn,
            login,
            logout,
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
