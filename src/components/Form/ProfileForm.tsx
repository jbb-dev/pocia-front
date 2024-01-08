import React from 'react';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';
import firstnameIcon from './../../assets/forms/firstname.svg';
import lastnameIcon from './../../assets/forms/lastname.svg';
import { DataStoreContext } from '../../store/rootStore';
import { IUser } from '../../store/user';

const ProfileForm : React.FC = () => {

    const { user } = React.useContext(DataStoreContext);

    const currentProfile: IUser | null = user.user ?? null;

    const { credentials, handleChangeCredentials } = useCredentials(currentProfile);

    const update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        user.updateProfile(credentials);
    };

    return (
        <form name="profile" onSubmit={update}>
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
            <Button 
                type='submit'
                label='Update'
                action={() => console.log('button')}
            />              
        </form>
    )
};

export default ProfileForm ;