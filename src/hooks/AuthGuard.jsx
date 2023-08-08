import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa la función useNavigate desde tu biblioteca de enrutamiento
import { useAuth } from './useAuth';
import {compareDates} from "../helpers/compareDates"; // Importa el hook useAuth que contiene las propiedades del usuario y funciones relacionadas

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const { user, expiresIn, logout } = useAuth();

    useEffect(() => {
        async function validUser() {
            if (!user) {
                navigate('/login');
            }
            if (!compareDates(expiresIn)) {
                logout();
            }
        }
        validUser();
    }, [user, expiresIn, logout, navigate]);

    return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
