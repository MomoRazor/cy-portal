import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const apiKey = publicRuntimeConfig?.apiKey;
const authDomain = publicRuntimeConfig?.authDomain;
const projectId = publicRuntimeConfig?.projectId;
const storageBucket = publicRuntimeConfig?.storageBucket;
const messagingSenderId = publicRuntimeConfig?.messagingSenderId;
const appId = publicRuntimeConfig?.appId;
const measurementId = publicRuntimeConfig?.measurementId;

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export const firebaseConfig: FirebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};
