import React from 'react';
import { IUser } from '../../store/user';

export const useCredentials = (initValue?: IUser | null) => {

    const initialValues: IUser = initValue ? initValue : {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        avatar: ""
    };

    const [credentials, setCredentials] = React.useState<IUser>(initialValues);

    const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name] : value});
    };

    return { credentials, handleChangeCredentials }
}