import React from 'react';

export const useCredentials = () => {

    const [credentials, setCredentials] = React.useState({
        email: "",
        password: ""
    });

    const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name] : value});
    };

    return { credentials, handleChangeCredentials }
}