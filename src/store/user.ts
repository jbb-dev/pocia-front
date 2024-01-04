import { types, flow } from "mobx-state-tree";
import { api, clearTokens } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/ToastAlert";
import defaultUser from './../assets/icons/defaultUser.png';

const { REACT_APP_API_URL } = process.env;

export interface IUser {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    avatar?: string,
};

export const UserStore = types
.model({
    user : types.maybeNull(types.frozen<IUser>()),
    isAuth: types.boolean
})
.actions(self => ({

    setIsAuth(authStatus: boolean) {
        self.isAuth = authStatus;
    },

    subscribe : flow (function* (userProfile: IUser) {
        let success = false;
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/user/profile`, userProfile);
            console.log('response subscribe ===> ', response)
            if (response.status === 200) 
            {
                StoreAlert.alert.setAlert(EToastStatus.SUCCESS, "Your account has been successfully created, welcome on board", null);
                self.user = response.data;
                self.isAuth = true;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
        return success;
    }),

    login : flow (function* (email: string, password: string) {
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/user/login`, {
                email,
                password
            });
            console.log('response login ===> ', response)
            if (response.status === 200 && response.data != null) 
            {
                const tokens = JSON.stringify(response.data.token);
                sessionStorage.setItem('tokens', tokens);
                self.user = response.data.user;
                self.isAuth = true;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    updateProfile : flow (function* (newProfile: IUser) {
        try {
            const response = yield api.put(`${REACT_APP_API_URL}/api/user/profile`, newProfile);
            console.log('response updateProfile ===> ', response)
            if (response.status === 200 && response.data != null) 
            {
                const tokens = JSON.stringify(response.data.token);
                sessionStorage.setItem('tokens', tokens);
                self.user = response.data.user;
                self.isAuth = true;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    signout() {
        clearTokens();
        self.isAuth = false;
        StoreAlert.alert.setAlert(EToastStatus.SUCCESS, "See you soon !", null);
    },
}))
.views(self => ({
    getUserAvatar() {
        return self.user?.avatar != null && self.user.avatar.length > 0 ? self.user.avatar : defaultUser;
    },
}))
;