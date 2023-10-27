import React, { FunctionComponent } from 'react';
import { ERoutes } from './ERoutes';
import teamIcon from './../../../assets/sidebar/team.svg';
import conversationIcon from './../../../assets/sidebar/speak.svg';
import logoutIcon from './../../../assets/sidebar/logout.svg';

import {ReactComponent as ConversationIcon} from './../../../assets/sidebar/speak.svg';
import {ReactComponent as LogoutIcon} from './../../../assets/sidebar/logout.svg';
import {ReactComponent as TeamIcon} from './../../../assets/sidebar/team.svg';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

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

    const toggleSidebar = () => {
        console.log('toggle')
        setIsSidebarOpen(!isSidebarOpen)
    };

    const sidebarClassName = `fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`;

    const moveTo = (route: ERoutes) => {
        navigate(route);
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
            <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside 
                id="default-sidebar" 
                className={sidebarClassName}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        </li>
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