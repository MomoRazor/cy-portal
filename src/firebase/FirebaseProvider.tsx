import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User, Unsubscribe as UnsubscribeAuth } from 'firebase/auth';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { FirebaseContext } from './context';
import { FirebaseConfig } from './config';

export interface IFirestoreConfig {
    userCollection: string;
    configCollection: string;
}

export interface IFirebaseProvider {
    firebaseConfig: FirebaseConfig;
    children?: ReactNode;
}

export const FirebaseProvider = (props: IFirebaseProvider) => {
    let unsubscribeAuth = useRef<UnsubscribeAuth>();

    const [initializing, setInitializing] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const onUserSet = useCallback((userFb: User | null) => {
        if (userFb) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setInitializing(false);
    }, []);

    const firebaseSetup = useCallback(() => {
        initializeApp(props.firebaseConfig);

        const auth = getAuth();
        unsubscribeAuth.current = onAuthStateChanged(auth, onUserSet);
    }, [onUserSet, props.firebaseConfig]);

    useEffect(() => {
        if (initializing) {
            firebaseSetup();
        }
    }, [firebaseSetup, initializing]);

    return (
        <FirebaseContext.Provider
            value={{
                loggedIn,
                initializing
            }}
        >
            {initializing ? <></> : props.children}
        </FirebaseContext.Provider>
    );
};
