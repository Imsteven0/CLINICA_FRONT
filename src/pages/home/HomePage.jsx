import React from "react";
import {useAuth} from '../../hooks/useAuth';
import {compareDates} from '../../helpers/compareDates';
import {useNavigate} from "react-router-dom";

export default function LoginForm() {

    /* utilidades para redireccionar a otra página y propiedades del usuario. */
    const navigate = useNavigate();
    const {user, expiresIn/*, token*/, logout} = useAuth()

    /* validaciones para que no se pueda acceder a la página si no está registrado. */
    if (!compareDates(expiresIn)) logout();
    if (!user) navigate("/login");


    return (
        <>
            <div>
                <h2>Bienvenido {user}.</h2>
            </div>
        </>
    );
};