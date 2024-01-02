import { types, flow, cast } from "mobx-state-tree";
import { api } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/Toast";

export interface IAssistant {
    name: string;
    service: string;
    biography: string;
    avatar: string;
}

const { REACT_APP_API_URL } = process.env;

export const AssistantStore = types
.model({
    list : types.maybeNull(types.frozen<IAssistant[]>()),
    selectedAssistant: types.maybeNull(types.frozen<IAssistant>()),
})
.actions(self => ({

    setList(assistants: IAssistant[]) {
        self.list = assistants;
    },

    setSelectedAssistant(assistant: IAssistant) {
        self.selectedAssistant = assistant;
    },

}))
;