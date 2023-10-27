import React from 'react';
import { Route, BrowserRouter, Routes, Outlet, Navigate } from "react-router-dom";
import { DataStoreContext } from '../../store/rootStore';
import { Provider } from 'mobx-react';
import { ERoutes } from '../shared/ERoutes';
import Conversation from '../Conversation/Conversation';

const Router = () => {

    const { conversation, user } = React.useContext(DataStoreContext)

    return (
        <BrowserRouter>
            <Provider value={DataStoreContext}>
                <Routes>
                    <Route path={ERoutes.CONVERSATION} element={<Conversation />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default Router;