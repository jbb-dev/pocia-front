import React from 'react';
import { Route, BrowserRouter, Routes, Outlet, Navigate } from "react-router-dom";
import { DataStoreContext } from '../../store/rootStore';
import { Provider, observer } from 'mobx-react';
import { ERoutes } from '../shared/Navigation/ERoutes';
import Conversation from '../Conversation/Conversation';
import Team from './Team';
import Profile from '../Assistant/Profile';
import Login from './Login';
import SideBar from '../shared/Navigation/SideBar';
import Header from '../shared/Navigation/Header';

const PrivateRoutes: React.FC = observer(() => {

    const { user: {isAuth} } = React.useContext(DataStoreContext)

    return (
        isAuth ? 
            <>
                {/* <Header /> */}
                <SideBar />
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <Outlet />
                    </div>
                </div> 
            </>
        : 
            <Navigate to={ERoutes.LOGIN}/>
    );
});

const Router: React.FC = observer(() => {

    const { conversation, user: {isAuth} } = React.useContext(DataStoreContext)

    return (
        <BrowserRouter>
            <Provider value={DataStoreContext}>
                        <Routes>

                            {/* PUBLIC ROUTES */}
                            <Route path={ERoutes.LOGIN} element={<Login />} />

                            {/* PRIVATE ROUTES */}
                            <Route element={<PrivateRoutes />} >
                                <Route path={ERoutes.CONVERSATION} element={<Conversation />} />
                                <Route path={ERoutes.TEAM} element={<Team />} />
                                <Route path={ERoutes.PROFILE} element={<Profile />} />
                            </Route>
                        </Routes>
            </Provider>
            
        </BrowserRouter>
    );
});

export default Router;