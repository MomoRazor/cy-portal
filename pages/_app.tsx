import React from 'react';
import {
    firebaseConfig,
    FirebaseProvider,
    GeneralProvider,
    NEXTGlobalStyle,
    SnackbarProvider
} from '../src';
import { AppProps } from 'next/dist/shared/lib/router/router';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <FirebaseProvider firebaseConfig={firebaseConfig}>
        <GeneralProvider appTitle="CY Portal">
            <SnackbarProvider>
                <NEXTGlobalStyle fontSize="14px" />
                <Component {...pageProps} />
            </SnackbarProvider>
        </GeneralProvider>
    </FirebaseProvider>
);

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
};

export default MyApp;
