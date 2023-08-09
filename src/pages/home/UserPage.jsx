import React, {useState} from "react";
import AuthGuard from "../../hooks/AuthGuard";
import {useAuth} from "../../hooks/useAuth";
import {updateUser} from "../../services/user";
import UserCard from "./UserCard";
import {Toastify} from "../../utilities/Toastify";

export default function LoginForm() {

    const [isUpdate, setIsUpdate] = useState(false);

    const {user, idUser} = useAuth()

    const hadbleUpdate = async () => {
        try {
            const cedula = document.getElementById('cedula').value
            const nombre = document.getElementById('first-name').value
            const apellido = document.getElementById('last-name').value
            const pais = document.getElementById('country').value
            const fechaNacimiento = document.getElementById('date').value
            const imageElement = document.getElementById('large_size');

            // Función para convertir una imagen en base64
            function convertImageToBase64(file) {
                return new Promise((resolve, reject) => {
                    // Verifica que el parámetro sea un objeto File
                    if (!(file instanceof File)) {

                    } else {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            resolve(event.target.result);
                        };
                        reader.onerror = function (error) {
                            reject(error);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }


            const imageData = await convertImageToBase64(imageElement.files[0]);

            const data = {
                _id: idUser,
                identification: cedula,
                name: nombre,
                lastname: apellido,
                country: pais,
                dateOfBirth: fechaNacimiento,
                image: imageData
            }

            let response = await updateUser(data);

            if (response.status === 200) {
                const jsonData = await response.json();
                setIsUpdate(false);
                Toastify('success', 'Se ha actualizado la información correctamente!');
                clearForm();
            }

        } catch (e) {
            console.log(e)
            clearForm();
            Toastify('error', 'Ha ocurrido un error inesperado, por favor intente más tarde.');
        }
    }

    const clearForm = () => {
        document.getElementById('cedula').value = ''
        document.getElementById('first-name').value = ''
        document.getElementById('last-name').value = ''
        document.getElementById('country').value = ''
        document.getElementById('date').value = ''
    }

    return (
        <>
            <AuthGuard/>
            <div className="px-6 py-2">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-black">Información de usuario</h1>
                    <h1 className="text-2xl font-semibold text-black">Bienvenido, {user}!</h1>
                </div>
                <p className="">¡Acá podrás editar tu información pública acerca de ti!</p>

                <div className="flex gap-10">
                    <div className="flex-col w-2/4">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="cedula" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cédula
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="cedula"
                                        name="cedula"
                                        type="number"
                                        autoComplete="email"
                                        className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
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
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Pais
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                        <option>Costa Rica</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha Nacimiento
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        autoComplete="email"
                                        className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3 pt-1.5">
                                <label className="block mb-2 text-sm font-medium text-gray-900"
                                       htmlFor="large_size">Cambiar imagen de perfil</label>
                                <input
                                    className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    id="large_size" type="file"/>
                            </div>

                            <div className="sm:col-span-6">
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {
                                            hadbleUpdate()
                                        }}
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Actualizar información
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserCard isUpdate={isUpdate}
                              setIsUpdate={setIsUpdate}/>

                </div>


            </div>
        </>
    );
};