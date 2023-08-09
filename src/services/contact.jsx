const BASEURL = 'http://localhost:5000';

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
