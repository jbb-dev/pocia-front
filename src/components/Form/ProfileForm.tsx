import React from 'react';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';

const ProfileForm : React.FC = () => {

    const { credentials, handleChangeCredentials } = useCredentials();

    const update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('update')
    };

    return (
        <form name="profile" onSubmit={update}>
            <TextInput
                name='email' 
                placeholder='Email'
                type='email'
                value={credentials.email}
                onChange={handleChangeCredentials}    
                imgSrc={"https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"}
                required       
            />
            <TextInput
                name='password'
                placeholder='Password' 
                type='password'
                value={credentials.password}
                onChange={handleChangeCredentials}    
                imgSrc={"https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"}
                required       
            />
            <Button 
                type='submit'
                label='Update'
                action={() => console.log('button')}
            />              
        </form>
    )
};

export default ProfileForm ;