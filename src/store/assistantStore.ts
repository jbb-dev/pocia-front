import { types, flow } from "mobx-state-tree";
import { api } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/ToastAlert";
import defaultAssistantAvatar from './../assets/icons/defaultAssistant.png';

export interface IAssistant {
    name: string;
    job: string;
    biography: string;
    avatar: string;
}

const { REACT_APP_API_URL } = process.env;

export const AssistantStore = types
.model({
    list : types.maybeNull(types.frozen<IAssistant[]>()),
    selectedAssistant: types.maybeNull(types.frozen<IAssistant>()),
    tempAssistant: types.maybeNull(types.frozen<IAssistant>()),
})
.actions(self => ({

    getAssistants : flow (function* () {
        try {
            const response = yield api.get(`${REACT_APP_API_URL}/api/assistant`);
            if (response.status === 200)
            {
                self.list = response.data;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    setSelectedAssistant(assistant: IAssistant | null) {
        self.selectedAssistant = assistant;
    },

    setTempAssistant(assistant: IAssistant) {
        self.tempAssistant = assistant;
    },

}))
.views(self => ({
    getAssistantAvatar() {
        return self.selectedAssistant?.avatar != null ? self.selectedAssistant.avatar : defaultAssistantAvatar;
    },
}));