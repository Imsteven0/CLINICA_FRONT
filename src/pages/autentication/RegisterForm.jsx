import * as React from "react";
import {useAuth} from "../../hooks/useAuth";
import {Toastify} from "../../utilities/Toastify";
import {Navigate} from "react-router-dom";
import {register} from '../../services/autentication'

export default function RegisterForm() {

    const {user, login} = useAuth()

    if (user) {
        Toastify('info', `Ya posees una sección activa!`);
        return <Navigate to="/"/>
    }

    const registerUser = async () => {
        const email = document.getElementById('email').value
        const nombre = document.getElementById('name').value
        const apellido = document.getElementById('lastname').value
        const hashedPassword = document.getElementById('hashedPassword').value

        const data = {
            email: email,
            name: nombre,
            lastname: apellido,
            hashedPassword: hashedPassword
        }

        if (!email || !nombre || !apellido || !hashedPassword) {
            Toastify('error', `Por favor ingresa todos los datos!`);
            return
        }

        let response = await register(data);
        console.log(response)
        if (response.status === 200) {
            const jsonData = await response.json();
            login(jsonData.token)
            Toastify('success', `Te has registrado correctamente!`);
        }else{
            Toastify('error', `Ha ocurrido un error!`);
        }
    }


    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center">
                <div className="bg-white px-10 py-10 rounded-3xl border-2">
                    <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
                        Ingresa tus credenciales
                    </h1>
                    <p className=" text-center font-medium text-lg text-gray-500 mt-4">
                        Porfavor ingresa tu credenciales
                    </p>
                    <div className="mt-2">
                        <div className="py-2">
                            <label className="text-lg font-medium">Nombre</label>
                            <input
                                id="name"
                                name="name"
                                className=" w-full border-2 border-gray-100 rounded-xl p-4 m-t1 bg-transparent"
                                placeholder="Ingresa tu nombre"
                                type="text"
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-lg font-medium">Apellidos</label>
                            <input
                                id="lastname"
                                name="lastname"
                                className=" w-full border-2 border-gray-100 rounded-xl p-4 m-t1 bg-transparent"
                                placeholder="Ingresa tu apellido"
                                type="text"
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-lg font-medium">Correo</label>
                            <input
                                id="email"
                                name="email"
                                className=" w-full border-2 border-gray-100 rounded-xl p-4 m-t1 bg-transparent"
                                placeholder="Ingresa tu correo"
                                type="text"
                            />
                        </div>
                        <div className="py'2">
                            <label className="text-lg font-medium">Contraseña</label>
                            <input
                                id="hashedPassword"
                                name="hashedPassword"
                                className=" w-full border-2 border-gray-100 rounded-xl p-4 m-t1 bg-transparent"
                                placeholder="Ingresa tu contraseña"
                                type="text"
                            />
                        </div>
                        <div className="flex justify-end py-1">
                            <a href="/">Inciar seccion en cuenta existente</a>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <button
                                onClick={() => registerUser()}
                                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 bg-violet-500 text-white text-sm font-bold rounded-xl">
                                Crear Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}