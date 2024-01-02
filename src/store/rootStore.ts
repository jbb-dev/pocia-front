import * as React from 'react';
import { types, Instance } from 'mobx-state-tree';
import { UserStore } from './user';
import { ConversationStore } from './conversation';
import { AssistantStore } from './assistantStore';

export const DataStore = types
    .model({
        user: UserStore,
        conversation: ConversationStore,
        assistant: AssistantStore
    });

export type DataStoreType = Instance<typeof DataStore>;

export const Store: DataStoreType = DataStore.create({
    user : {
        user: null,
        isAuth: false,
    },
    conversation: {
        conversations: null,
        currentConversation: null,
        message: null
    },
    assistant: {
        list: null,
        selectedAssistant: null
    }
});

export const DataStoreContext = React.createContext(Store);
