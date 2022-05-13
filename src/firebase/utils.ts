import { FirebaseError } from 'firebase/app';
import { getAuth, IdTokenResult } from 'firebase/auth';

let fbToken: IdTokenResult | undefined;

export const getAuthHeaders = async () => {
    const firebaseAuth = getAuth();

    const user = firebaseAuth.currentUser;

    if (user) {
        if (!fbToken || new Date(fbToken.expirationTime).getTime() < Date.now()) {
            fbToken = await user.getIdTokenResult(true);
        }

        return {
            authorization: `Bearer ${fbToken.token}`
        };
    } else {
        return null;
    }
};

export const parseFirebaseErrors = (e: FirebaseError) => {
    if (e.code === 'auth/wrong-password') {
        return 'Password is incorrect';
    } else if (e.code === 'auth/user-not-found') {
        return 'User not found';
    } else if (e.code === 'auth/invalid-email' || e.code === 'auth/invalid-email-verified') {
        return 'Email is incorrect';
    } else {
        if (e.cause) {
            return e.cause.message;
        } else {
            return e.message;
        }
    }
};
