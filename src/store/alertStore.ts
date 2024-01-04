import * as React from 'react';
import { types, Instance, cast } from 'mobx-state-tree';
import { EToastStatus } from '../components/shared/ToastAlert';

const AlertStore = types
    .model({
        status: types.maybeNull(types.frozen<EToastStatus>()),
        message: types.maybeNull(types.string),
        errors: types.maybeNull(types.array(types.string))
    })
    .actions(self => ({
        setAlert(newStatus : EToastStatus, message: string | null, errors: null | string[]) {
            self.status = newStatus;
            self.message = message;
            self.errors = cast(errors);
        },
    }))
;

export const AlertDataStore = types
    .model({
        alert: AlertStore,
    });

export type AlertDataStoreType = Instance<typeof AlertDataStore>;

export const StoreAlert: AlertDataStoreType = AlertDataStore.create({
    alert: {
        status: EToastStatus.NONE,
        message: null,
        errors: null
    },
});

export const AlertStoreContext = React.createContext(StoreAlert);
