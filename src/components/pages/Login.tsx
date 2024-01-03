import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../shared/Navigation/ERoutes';
import { DataStoreContext } from '../../store/rootStore';
import Logo from './../../assets/logo/logo512.png';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import { useCredentials } from '../../utils/hooks/useCredentials';

type Props = {}

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



const Login: React.FC = (props: Props) => {

    const [hasAccount, setHasAccount] = React.useState<boolean>(false);

    const toggleAccount = () => setHasAccount(!hasAccount);

    const title: string = hasAccount ? 'Welcome back' : 'Increase your business by hiring chat assistants';
    
    return (

        <section>
            <div className="grid gap-0 md:h-screen md:grid-cols-2">
                <div className="flex items-center justify-center bg-[#f2f2f7]">
                    <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-24 lg:py-32">
                        <div className="mb-5 flex h-14 w-14 flex-col items-center justify-center bg-white md:mb-6 lg:mb-8">
                        <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a949eade6cf7d_Vector-2.svg" alt="" className="inline-block" />
                        </div>
                        <div className="mb-8 text-sm sm:text-base md:mb-12 lg:mb-16">
                            <p className='mb-4'>Bienvenue sur ce petit repo de démonstration.</p>
                            <p className='mb-4'>Il s'agit d'une interface permettant d'utiliser l'api d'OpenApi et de discuter avec ChatGPT.</p>
                            <p>L'interface permet également d'utiliser un profil d'assistant virtuel de façon à obtenir des réponses plus précises en fonction de l'assistant sélectionné.</p>
                        </div>
                        <div className="mb-8 text-sm sm:text-base md:mb-12 lg:mb-16">
                            <p className='mb-4'>Welcome to this little demo repo.</p>
                            <p className='mb-4'>This is an interface for using the OpenApi API and chatting with ChatGPT.</p>
                            <p>The interface also allows you to use a virtual assistant profile in order to obtain more precise responses depending on the selected assistant.</p>
                        </div>
                        <p className="text-sm font-bold sm:text-base">Jean-Baptiste Bouillat</p>
                        <p className="text-sm sm:text-sm">Développeur full stack JS / JS full stack developper</p>
                    </div>
                </div>
                <div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-24 lg:py-32">
                    <div className="max-w-md text-center flex flex-col justify-center">
                        <img src={Logo} className="h-32 mb-8 rounded-full mx-auto" alt="Logo" />
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">{title}</h2>
                        <div className="mx-auto mb-4 max-w-[400px] pb-4">
                            {hasAccount ? 
                                    <LoginForm />
                                :    
                                    <RegisterForm />
                            }
                        </div>
                        <p className="text-sm text-[#636262] sm:text-sm">
                            Already have an account? 
                            <span 
                                onClick={toggleAccount}
                                className="font-bold text-[#0b0b1f] cursor-pointer ml-2"
                            >
                                Login now
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>    
)   ;
};

export default Login;