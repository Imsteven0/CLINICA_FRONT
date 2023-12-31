const BASEURL = 'https://different-fly-pantyhose.cyclic.app/';

/* END-POINT que permite al usuario registrarse en el sistema. */
export const loginFetch = async (values) => {
    return await fetch(BASEURL + '/Auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
}

/* END-POINT que permite al usuario registrarse en el sistema. */
export const register = async (values) => {
    return await fetch(BASEURL + '/Auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
}