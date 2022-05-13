import { createContext } from 'react';

export interface IFirebaseContext {
    initializing: boolean;
    loggedIn: boolean;
}

export const defaultFirebaseContext: IFirebaseContext = {
    initializing: true,
    loggedIn: false
};

export const FirebaseContext = createContext<IFirebaseContext>(defaultFirebaseContext);
