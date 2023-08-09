import React from 'react';
import {ToastContainer, toast} from 'react-toastify';

export const Toastify = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'info':
            toast.info(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
    }


    return (
        <div>
            <ToastContainer/>
        </div>
    );
};
