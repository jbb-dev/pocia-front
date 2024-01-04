import React from 'react';
import { DataStoreContext } from '../../store/rootStore';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';
import { passwordRegex } from '../../utils/constants/regex';
import { AlertStoreContext } from '../../store/alertStore';
import { EToastStatus } from '../shared/ToastAlert';
import emailIcon from './../../assets/forms/mail.svg';
import passwordIcon from './../../assets/forms/password.svg';

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
                placeholder='Email'
                type='email'
                value={credentials.email}
                onChange={handleChangeCredentials}    
                imgSrc={emailIcon}
                required       
            />
            <TextInput
                name='password' 
                placeholder='Password'
                type='password'
                value={credentials.password}
                onChange={handleChangeCredentials}    
                imgSrc={passwordIcon}
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