import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {getUserById} from "../../services/user";
import {Toastify} from "../../utilities/Toastify";

export default function UserCard({isUpdate, setIsUpdate}) {

    const [UserData, setUserData] = useState([]);

    const {idUser} = useAuth()

    useEffect(() => {
        if (isUpdate === true) return;
        const getUser = async () => {
            try {
                let response = await getUserById(idUser);
                if (response.status === 200) {
                    const jsonData = await response.json();
                    setUserData(jsonData);
                    setIsUpdate(true);
                }
            } catch (e) {
                Toastify('error', 'Ha ocurrido un error inesperado, al consultar la informacion del usuario.');
                console.log(e);
            }
        };

        getUser();
    }, [isUpdate]);


    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();

        const ageInMilliseconds = currentDate - birthDate;

        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
        const ageInYears = ageInMilliseconds / millisecondsPerYear;

        return Math.floor(ageInYears);
    }

    return (
        <>
            {UserData ? (
                <div className="flex-col w-2/4 pt-10">
                    <div className="sm:flex sm:justify-center gap-4">
                        <div>
                            <img
                                className="inline-block sm:h-30 sm:w-30 h-40 w-40 rounded-[40px] ring-2 ring-white"
                                src={UserData.image}
                                alt=""
                            />
                        </div>
                        <div className="flex-col" key={UserData._id}>

                            {UserData.name && UserData.lastname ? (
                                <p className="font-bold text-lg pb-1">
                                    {UserData.name} {UserData.lastname}
                                </p>
                            ) : (
                                <p className="font-bold text-lg pb-1 text-red-600">Nombre incompleto</p>
                            )}

                            {UserData.identification ? (
                                <p className="font-normal text-sm pb-1">
                                    Cédula: {UserData.identification}
                                </p>
                            ) : (
                                <p className="font-normal text-sm pb-1 text-red-600">Cédula incompleta</p>
                            )}

                            {UserData.email ? (
                                <p className="font-normal text-sm pb-1">Email: {UserData.email}</p>
                            ) : (
                                <p className="font-normal text-sm pb-1 text-red-600">Email incompleto</p>
                            )}

                            {UserData.country ? (
                                <p className="font-normal text-sm pb-1">Ciudad: {UserData.country}</p>
                            ) : (
                                <p className="font-normal text-sm pb-1 text-red-600">Ciudad incompleta</p>
                            )}

                            {UserData.dateOfBirth ? (
                                <p className="font-normal text-sm pb-1">
                                    Edad: {calculateAge(UserData.dateOfBirth)} años
                                </p>
                            ) : (
                                <p className="font-normal text-sm pb-1 text-red-600">Edad incompleta</p>
                            )}

                            {UserData.name &&
                            UserData.lastname &&
                            UserData.identification &&
                            UserData.email &&
                            UserData.country &&
                            UserData.dateOfBirth ? (
                                <span
                                    className="inline-flex pb-1 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> Información completa
                        </span>
                            ) : <span
                                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"> Información Incompleta
                        </span>}
                        </div>
                    </div>
                </div>
            ) : (
                <h2 className="text-2xl font-bold text-center text-gray-900">Cargando...</h2>
            )}

        </>
    );
};