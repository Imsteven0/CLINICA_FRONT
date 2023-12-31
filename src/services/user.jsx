const BASEURL = 'https://different-fly-pantyhose.cyclic.app/';

/* END-POINT que permite guardar un nuevo mensaje. */
export const updateUser = async (values) => {
    return await fetch(BASEURL + '/User/UpdateUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
}

/* Obtener el usuario por el id. */
export const getUserById = async (idConversation) => {
    return await fetch(BASEURL + '/User/GetUserById/' + idConversation, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/* Obtener un mensaje especifico apartir de un idMessage. */
export const getSpecificMessage = async (idMessage) => {
    return await fetch(BASEURL + '/Message/listMessagesById/' + idMessage, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}