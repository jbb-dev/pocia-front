import React from 'react';
import { DataStoreContext } from '../../store/rootStore';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';
import { passwordRegex } from '../../utils/constants/regex';
import { AlertStoreContext } from '../../store/alertStore';
import { EToastStatus } from '../shared/ToastAlert';

const LoginForm: React.FC = () => {

    const { user } = React.useContext(DataStoreContext);
    const { alert } = React.useContext(AlertStoreContext);

    const { credentials, handleChangeCredentials } = useCredentials();

    const passWordIsValid: boolean = credentials.password.match(passwordRegex) != null ? true : false;

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passWordIsValid)
        {
            user.login(credentials.email, credentials.password);
        }
        alert.setAlert(EToastStatus.FAIL, "Your password must be 8 characters long, an uppercase letter, a lowercase letter, a number or a special character", null);
    };

    return (
        <form name="login" onSubmit={login}>
            <TextInput
                name='email' 
                type='email'
                value={credentials.email}
                onChange={handleChangeCredentials}    
                imgSrc={"https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"}
                required       
            />
            <TextInput
                name='password' 
                type='password'
                value={credentials.password}
                onChange={handleChangeCredentials}    
                imgSrc={"https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"}
                required       
            />
            <Button 
                type='submit'
                label='Login'
                action={() => console.log('button')}
            />            
        </form>
    )
};

export default LoginForm;