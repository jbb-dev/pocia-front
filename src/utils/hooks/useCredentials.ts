import React from 'react';
import { IUser } from '../../store/user';

export const useCredentials = () => {

    const [credentials, setCredentials] = React.useState<IUser>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        avatar: ""
    });

    const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name] : value});
    };

    return { credentials, handleChangeCredentials }
}