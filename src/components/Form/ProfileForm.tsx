import React from 'react';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';
import emailIcon from './../../assets/forms/mail.svg';
import passwordIcon from './../../assets/forms/password.svg';
import firstnameIcon from './../../assets/forms/firstname.svg';
import lastnameIcon from './../../assets/forms/lastname.svg';
import { DataStoreContext } from '../../store/rootStore';
import { passwordRegex } from '../../utils/constants/regex';
import { AlertStoreContext } from '../../store/alertStore';
import { EToastStatus } from '../shared/ToastAlert';
import { IUser } from '../../store/user';

const ProfileForm : React.FC = () => {

    const { user } = React.useContext(DataStoreContext);
    const { alert } = React.useContext(AlertStoreContext);

    const currentProfile: IUser | null = user.user ?? null;

    const { credentials, handleChangeCredentials } = useCredentials(currentProfile);
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");


    const update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (credentials.password.length > 0 && !passWordIsValid)
        {
            return alert.setAlert(EToastStatus.FAIL, "Your password must be 8 characters long, an uppercase letter, a lowercase letter, a number or a special character", null);
        }
        if (confirmPassword !== credentials.password)
        {
            return alert.setAlert(EToastStatus.FAIL, "Password and Confirmation Password need to be the same", null);
        }
        user.updateProfile(credentials);
    };

    const passWordIsValid: boolean = credentials.password.match(passwordRegex) != null ? true : false;

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
            <TextInput
                name='password' 
                placeholder='Password'
                type='password'
                value={credentials.password}
                onChange={handleChangeCredentials}    
                imgSrc={passwordIcon}
                required={false}      
            />
            <TextInput
                name='confirmPassword' 
                placeholder='Confirmation password'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}    
                imgSrc={passwordIcon}
                required={false}      
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