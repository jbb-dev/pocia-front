import React from 'react';
import Logo from './../../assets/logo/logo512.png';
import RegisterForm from '../Form/RegisterForm';
import LoginForm from '../Form/LoginForm';
import { observer } from 'mobx-react';
import { DataStoreContext } from '../../store/rootStore';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../shared/Navigation/ERoutes';

const Login: React.FC = observer(() => {

    const { user } = React.useContext(DataStoreContext);
    let navigate = useNavigate();

    const [hasAccount, setHasAccount] = React.useState<boolean>(false);
    const toggleAccount = () => setHasAccount(!hasAccount);

    const title: string = 'Increase your skills with your personnal chat assistants.';
    const switchFormText: string = hasAccount ? 'No account yet ?' : 'Already have an account ?';
    const switchFormTextAction: string = hasAccount ? 'Sign up now' : 'Login now';

    React.useEffect(() => {
        if (user.isAuth)
        {
            navigate(ERoutes.TEAM);
        }
    }, [user.isAuth]);
    
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
                <div className="flex items-center justify-center py-8 md:py-0 lg:py-0">
                    <div className="max-w-md text-center flex flex-col justify-center">
                        <img src={Logo} className="h-32 mb-8 rounded-full mx-auto" alt="Logo" />
                        <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">{title}</h2>
                        <div className="mx-auto mb-4 max-w-[400px] pb-4">
                            {hasAccount ? 
                                    <LoginForm />
                                :    
                                    <RegisterForm toggleForm={toggleAccount} />
                            }
                        </div>
                        <p className="text-sm text-[#636262] sm:text-sm">
                            {switchFormText}
                            <span 
                                onClick={toggleAccount}
                                className="font-bold text-[#0b0b1f] cursor-pointer ml-2"
                            >
                                {switchFormTextAction}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>    
)   ;
});

export default Login;