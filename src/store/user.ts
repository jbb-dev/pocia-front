import { types, flow } from "mobx-state-tree";
import { api, clearToken } from './../api/api';
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
            if (response.status === 200) 
            {
                StoreAlert.alert.setAlert(EToastStatus.SUCCESS, "Your account has been successfully created, you can now login", null);
                success = true;
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
            if (response.status === 200 && response.data != null) 
            {
                const token = JSON.stringify(response.data.token);
                sessionStorage.setItem('token', token);
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
            const response = yield api.put(`${REACT_APP_API_URL}/api/user/profile`, { firstname: newProfile.firstname, lastname: newProfile.lastname });
            if (response.status === 200 && response.data != null) 
            {
                StoreAlert.alert.setAlert(EToastStatus.SUCCESS, "Your profile has been successfully updated", null);
                self.user = response.data;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    signout() {
        clearToken();
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