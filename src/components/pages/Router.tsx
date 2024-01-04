import React from 'react';
import { Route, BrowserRouter, Routes, Outlet, Navigate } from "react-router-dom";
import { DataStoreContext } from '../../store/rootStore';
import { Provider, observer } from 'mobx-react';
import { ERoutes } from '../shared/Navigation/ERoutes';
import Team from './Team';
import Login from './Login';
import SideBar from '../shared/Navigation/SideBar';
import Conversation from '../Conversation/Conversation';
import AssistantDetails from '../Assistant/AssistantDetails';
import Profile from './Profile';
import ToastAlert, { EToastStatus } from '../shared/ToastAlert';
import { AlertStoreContext } from '../../store/alertStore';

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

    const { alert } = React.useContext(AlertStoreContext);

    const showAlert: boolean = alert.status != null && alert.status !== EToastStatus.NONE;

    return (
        <BrowserRouter>
            <Provider value={DataStoreContext}>
                {showAlert && <ToastAlert />}
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path={ERoutes.LOGIN} element={<Login />} />

                    {/* PRIVATE ROUTES */}
                    <Route element={<PrivateRoutes />} >
                        <Route path={ERoutes.TEAM} element={<Team />} />
                        <Route path={ERoutes.ASSISTANT} element={<AssistantDetails />} />
                        <Route path={ERoutes.CONVERSATION} element={<Conversation />} />
                        <Route path={ERoutes.USER_PROFILE} element={<Profile />} />
                    </Route>
                </Routes>
            </Provider>
            
        </BrowserRouter>
    );
});

export default Router;