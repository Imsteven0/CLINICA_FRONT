import React, {useState} from "react";
import AuthGuard from "../../hooks/AuthGuard";
import {useAuth} from '../../hooks/useAuth'
import {updateContact} from "../../services/contact"
import {Toastify} from "../../utilities/Toastify";

export default function Quotes() {

    const [isUpdate, setIsUpdate] = useState(false);

    const {user, login ,idUser} = useAuth() // este ese idUser lo podes llamar en cualquier componente digamos.

    console.log("este " + idUser)
    const registerContact = async () => {
        try {
           
            const nombre = document.getElementById('first-name').value
            const apellido = document.getElementById('last-name').value
            const cedula = document.getElementById('identification').value
            const telefono = document.getElementById('phone').value
            const direccion = document.getElementById('direction').value
            const parentezco = document.getElementById('relationship').value

            const data = {
                idUser: idUser,
                name: nombre,
                lastname: apellido,
                identification: cedula,
                phone: telefono,
                direction: direccion,
                relationship: parentezco
            }

            let response = await updateContact(data);

            if (response.status === 200) {
                const jsonData = await response.json();
                setIsUpdate(false);
                Toastify('success', 'Se ha agregado al contacto correctamente!');
            }

        } catch (e) {
            console.log(e)
            Toastify('error', 'Ha ocurrido un error inesperado, por favor intente más tarde.');
        } 
    }
    

    return (
        <>
        <AuthGuard/>
        <div className="px-6 py-2">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-black">Información de Contacto</h1>
                <h1 className="text-2xl font-semibold text-black">Bienvenido, {user}!</h1>
            </div>
            <p className="">¡Acá podrás agregar tus contactos de emergencia !</p>

            <div className="flex gap-10">
                <div className="flex-col w-2/4">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="identification"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Cédula
                            </label>
                            <div className="mt-2">
                                <input
                                    id="identification"
                                    name="identification"
                                    type="number"
                                    autoComplete="email"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Telefono
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    autoComplete="email"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="direction"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Dirección
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="direction"
                                    id="direction"
                                    autoComplete="on"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="relationship"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Parentezco
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="relationship"
                                    id="relationship"
                                    autoComplete="on"
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        registerContact()
                                    }}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Añadir Contacto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>
);
};