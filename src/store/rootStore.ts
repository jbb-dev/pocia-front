import * as React from 'react';
import { types, Instance } from 'mobx-state-tree';
import { UserStore } from './user';
import { ConversationStore } from './conversation';

export const DataStore = types
    .model({
        user: UserStore,
        conversation: ConversationStore
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
    }
});

export const DataStoreContext = React.createContext(Store);
