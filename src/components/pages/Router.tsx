import React from 'react';
import { Route, BrowserRouter, Routes, Outlet, Navigate } from "react-router-dom";
import { DataStoreContext } from '../../store/rootStore';
import { Provider, observer } from 'mobx-react';
import { ERoutes } from '../shared/Navigation/ERoutes';
import Team from './Team';
import Profile from '../Assistant/Profile';
import Login from './Login';
import SideBar from '../shared/Navigation/SideBar';
import Conversation from '../Conversation/Conversation';

const PrivateRoutes: React.FC = observer(() => {

    const { user: {isAuth} } = React.useContext(DataStoreContext)

    return (
        isAuth ? 
            <>
                <SideBar />
                <div className="pt-14 sm:ml-64 ">
                        <Outlet />
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
                        <Route path={ERoutes.TEAM} element={<Team />} />
                        <Route path={ERoutes.ASSISTANT} element={<Profile />} />
                        <Route path={ERoutes.CONVERSATION} element={<Conversation />} />
                    </Route>
                </Routes>
            </Provider>
            
        </BrowserRouter>
    );
});

export default Router;