import { types, flow, cast } from "mobx-state-tree";
import { api } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/ToastAlert";
import { EWriterRole } from "../components/Conversation/Message";
import { IAssistant } from "./assistantStore";

export interface IMessage {
    senderRole: EWriterRole;
    content: string;
    conversationId?: string;
}

const { REACT_APP_API_URL } = process.env;

export const ConversationStore = types
.model({
    conversations : types.maybeNull(types.array(types.frozen<IMessage>())),
    currentConversation: types.maybeNull(types.array(types.frozen<IMessage>())),
    message: types.maybeNull(types.frozen<IMessage>())
})
.actions(self => ({

    setMessage(newMessage: IMessage) {
        self.message = newMessage;
    },

    getConversation : flow (function* (assistant: IAssistant | null) {
        if (assistant != null)
        {
            try {
                const response = yield api.get(`${REACT_APP_API_URL}/api/conversation/${assistant._id}`);
                if (response.status === 200)
                {
                    self.currentConversation = response.data;
                };
            } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
            };
        }
    }),

    sendMessage : flow (function* (assistant: IAssistant | null) {
        let conversation: IMessage[] | null = self.currentConversation != null ? [...self.currentConversation] : [];
        conversation.push(self.message as IMessage); // add first the user message before waiting for the assistant response.

        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/chat`, { 
                message: self.message,
                assistant: assistant
            });
            if (response.status === 200)
            {
                conversation.push(response.data as IMessage);
            }
        } catch (error: any) {
            const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
            StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
        self.message = null; // clear message
        self.currentConversation = cast(conversation);
    }),

}))
;