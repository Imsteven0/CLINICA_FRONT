const BASEURL = 'https://different-fly-pantyhose.cyclic.app/';

/* END-POINT que permite guardar un nuevo contacto. */
export const updateContact = async (values) => {
    return await fetch(BASEURL + '/Contact/AddContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
}


export const getUsersContactsByIdUser = async (idContact) => {
    return await fetch(BASEURL + '/Contact/GetContactById/' + idContact, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export const deleteUserContact = async (idContact) => {
    return await fetch(BASEURL + '/Contact/deleteContactById/' + idContact, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}