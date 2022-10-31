import React from 'react'
import { Provider } from 'react-redux'
import {
    AppProvider,
    Browser,
    browserChecker,
    LoadingPage,
    NEXTGlobalStyle
} from '@sector-eleven-ltd/se-react-toolkit'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store, themeConfig } from '../src'
import { AppProps } from 'next/dist/shared/lib/router/router'

const MyApp = ({ Component, pageProps, browserType }: AppProps & { browserType: Browser }) => (
    <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
            <AppProvider
                nav={{
                    browser: browserType
                }}
                theme={themeConfig}
            >
                <NEXTGlobalStyle fontSize="14px" />
                <Component {...pageProps} />
            </AppProvider>
        </PersistGate>
    </Provider>
)

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps = {}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    let browserType = browserChecker(ctx)
    return { pageProps, browserType }
}

export default MyApp
