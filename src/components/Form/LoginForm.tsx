import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../shared/Navigation/ERoutes';
import { DataStoreContext } from '../../store/rootStore';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';

const LoginForm: React.FC = () => {

    const { user } = React.useContext(DataStoreContext);

    const { credentials, handleChangeCredentials } = useCredentials();

    let navigate = useNavigate();

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        user.setIsAuth(true);
        navigate(ERoutes.TEAM);
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