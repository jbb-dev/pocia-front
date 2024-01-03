
import React from 'react';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';

const RegisterForm: React.FC = () => {

    const { credentials, handleChangeCredentials } = useCredentials();

    const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('subscribe')
    };

    return (
        <form name="register" onSubmit={subscribe}>
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
                label='Sign Up'
                action={() => console.log('button')}
            />  
        </form>
    )
};

export default RegisterForm;