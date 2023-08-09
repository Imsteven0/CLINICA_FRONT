import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {Toastify} from "../../utilities/Toastify";
import {deleteUserContact, getUsersContactsByIdUser} from "../../services/contact";

export default function ContactTable({isUpdate, setIsUpdate}) {

    const [UserContactData, setUserContactData] = useState([]);

    const {idUser} = useAuth()

    useEffect(() => {
        if (isUpdate === true) return;
        const getUserContact = async () => {
            try {
                let response = await getUsersContactsByIdUser(idUser);
                if (response.status === 200) {
                    const jsonData = await response.json();
                    setUserContactData(jsonData);
                    setIsUpdate(true);
                }
            } catch (e) {
                Toastify('error', 'Ha ocurrido un error inesperado, al consultar los datos de contacto.');
                console.log(e);
            }
        };

        getUserContact();
    }, [isUpdate]);


    // eliminar contacto
    const handleDelete = async (id) => {
        try {
            const response = await deleteUserContact(id);
            if (response.status === 200) {
                Toastify('success', 'Contacto eliminado correctamente.');
                setIsUpdate(false);
            }
        } catch (e) {
            Toastify('error', 'Ha ocurrido un error inesperado, al eliminar el contacto.');
            console.log(e);
        }
    };

    return (
        <>
            {UserContactData ? (
                <div className="pt-4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <caption
                                className="p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
                                Tus contactos de emergencia
                                <p className="mt-1 text-sm font-normal text-gray-500 ">Lista que usted
                                    ha proporcionado para que nuestro equipo pueda ponerse en contacto con usted en
                                    caso de una situación de emergencia, si llegara a ser necesario.</p>
                            </caption>
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Cédula
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre Completo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telefono
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dirección
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Parentezco
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Accion
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                UserContactData.map((contact) => (
                                    <tr className="bg-white border-b " key={contact._id}>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {contact.identification}
                                        </th>
                                        <td className="px-6 py-4">
                                            {contact.name} {contact.lastname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.direction}
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.relationship}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#"
                                               onClick={() => handleDelete(contact._id)}
                                               className="font-medium text-red-600 hover:underline">Eliminar</a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h2 className="text-2xl font-bold text-center text-gray-900">Cargando...</h2>
            )}
        </>
    );
};