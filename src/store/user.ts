import { types, flow } from "mobx-state-tree";
import { api } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/ToastAlert";
import defaultUser from './../assets/icons/defaultUser.png';

const { REACT_APP_API_URL } = process.env;

export interface IUser {
    email: string | null,
    firstname: string,
    avatar: string,
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
        let success = false;
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/auth/login`, {
                email,
                password
            });
            console.log('response ===> ', response)
            if (response.status === 200 && response.data != null) 
            {
                const tokens = JSON.stringify(response.data);
                sessionStorage.setItem('tokens', tokens);
                success = true;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
        return { success };
    }),
}))
.views(self => ({
    getUserAvatar() {
        return self.user?.avatar != null ? self.user.avatar : defaultUser;
    },
}))
;