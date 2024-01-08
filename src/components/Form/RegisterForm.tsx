
import React from 'react';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';
import emailIcon from './../../assets/forms/mail.svg';
import passwordIcon from './../../assets/forms/password.svg';
import firstnameIcon from './../../assets/forms/firstname.svg';
import lastnameIcon from './../../assets/forms/lastname.svg';
import { DataStoreContext } from '../../store/rootStore';

interface Props {
    toggleForm: () => void;
}

const RegisterForm: React.FC<Props> = (props: Props) => {

    const { credentials, handleChangeCredentials } = useCredentials();
    const { user } = React.useContext(DataStoreContext);

    const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success: boolean = await user.subscribe(credentials);
        if (success)
        {
            props.toggleForm();
        }
    };

    return (
        <form name="register" onSubmit={subscribe}>
            <TextInput
                name='firstname' 
                placeholder='Firstname'
                type='text'
                value={credentials.firstname}
                onChange={handleChangeCredentials}    
                imgSrc={firstnameIcon}
                required       
            />
            <TextInput
                name='lastname' 
                placeholder='Lastname'
                type='text'
                value={credentials.lastname}
                onChange={handleChangeCredentials}    
                imgSrc={lastnameIcon}
                required       
            />
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
                value={credentials.password || ""}
                onChange={handleChangeCredentials}    
                imgSrc={passwordIcon}
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