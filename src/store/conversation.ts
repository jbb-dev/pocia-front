import { types, flow, cast } from "mobx-state-tree";
import { api } from './../api/api';
import { StoreAlert } from './alertStore';
import { EToastStatus } from "../components/shared/Toast";
import { EWriterRole } from "../components/Conversation/Message";

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

    getConversation : flow (function* () {
        console.log('get conversation')
        try {
            const response = yield api.get(`${REACT_APP_API_URL}/api/conversation`);
            if (response.status === 200)
            {
                self.currentConversation = response.data;
            };
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
        };
    }),

    sendMessage : flow (function* () {
        console.log('send message')
        let conversation: IMessage[] | null = self.currentConversation != null ? [...self.currentConversation] : [];
        try {
            const response = yield api.post(`${REACT_APP_API_URL}/api/chat`, self.message);
            if (response.status === 200)
            {
                conversation.push(response.data as IMessage);
            }
        } catch (error: any) {
                const message = error.response?.data?.message?.length > 0 ? error.response.data.message : "Des erreurs se sont produites :";
                StoreAlert.alert.setAlert(EToastStatus.FAIL, message, error.response?.data?.errors);
                conversation.push(self.message as IMessage); // Only for testing purpose : if backend not connected, allows to get user messages displayed
                self.currentConversation = cast(conversation); // Only for testing purpose : if backend not connected, allows to get user messages displayed 
        };
        self.message = null; // clear message
        self.currentConversation = cast(conversation);
    }),

}))
;