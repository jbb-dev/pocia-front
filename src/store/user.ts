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

    signout : flow (function* () {
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/user/logout`);
            if (response.status === 200)
            {
                StoreAlert.alert.setAlert(EToastStatus.SUCCESS, "See you soon !", null);
                self.isAuth = false;
                clearTokens();
            };
        } catch (error: any) {
            const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
            StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    updateProfile : flow (function* (newProfile: IUser) {
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/user`, newProfile);
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
}))
.views(self => ({
    getUserAvatar() {
        return self.user?.avatar != null ? self.user.avatar : defaultUser;
    },
}))
;