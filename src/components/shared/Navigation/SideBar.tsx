import React from 'react';
import { ERoutes } from './ERoutes';
import {ReactComponent as ConversationIcon} from './../../../assets/sidebar/speak.svg';
import {ReactComponent as LogoutIcon} from './../../../assets/sidebar/logout.svg';
import {ReactComponent as TeamIcon} from './../../../assets/sidebar/team.svg';
import Logo from './../../../assets/logo/logo192.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HEADER_HEIGHT } from './Header';

const ICON_WIDTH = '1.5rem';

interface IMenuItem {
    title: string,
    path: ERoutes,
    icon: React.ReactNode
}

const menuItems: IMenuItem[] = [
    {
        title: "Équipe",
        path: ERoutes.TEAM,
        icon: <TeamIcon width={ICON_WIDTH}/>
    },
    {
        title: "Discussion",
        path: ERoutes.CONVERSATION,
        icon: <ConversationIcon width={ICON_WIDTH}/>
    },
    {
        title: "Se déconnecter",
        path: ERoutes.LOGIN,
        icon: <LogoutIcon width={ICON_WIDTH}/>
    },
] 

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState<boolean>(false);


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const sidebarClassName = `fixed top-6rem left-0 z-40 w-64 h-[calc(100vh_-_6rem)] transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`;

    const moveTo = (route: ERoutes) => {
        navigate(route);
        toggleSidebar();
    };

    const isActive = (item: IMenuItem):boolean => {
        if (item.path === location.pathname || location.pathname.includes(item.path)) 
        {
            return true;
        }
        return false;
    };
    
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="flex ml-2 md:mr-24">
                                <img src={Logo} className="h-8 mr-3 rounded-full" alt="Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Pocia</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <button onClick={toggleUserMenu} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="z-50 absolute top-14 right-0 mt-2 w-48 py-1 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                Neil Sims
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover.bg-gray-100 dark:text-gray-300 dark:hover.bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={sidebarClassName} aria-label="Sidebar">
                <div className="h-screen px-3 pt-20 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item, index) =>
                            <li key={index}>
                                <NavLink 
                                    to={item.path}
                                    className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                    // style={({ isActive }) => isActive ? activeStyle as React.CSSProperties : passiveStyle as React.CSSProperties }
                                    onClick={() => moveTo(item.path)}
                                >
                                        {item.icon}
                                        <span className="ml-3">
                                            {item.title}
                                        </span>
                                
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideBar;