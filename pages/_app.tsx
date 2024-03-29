import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {
    AppProvider,
    Browser,
    LoadingPage,
    NEXTGlobalStyle,
    browserChecker
} from '@sector-eleven-ltd/se-react-toolkit'
import {
    FirebaseProvider,
    FirestoreProvider,
    themeConfig,
    store,
    HistoryProvider,
    persistor
} from '../src'

const MyApp = ({ Component, pageProps, browserType }: AppProps & { browserType: Browser }) => (
    <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
            <AppProvider
                nav={{
                    browser: browserType
                }}
                theme={themeConfig}
            >
                <FirebaseProvider>
                    <FirestoreProvider>
                        <NEXTGlobalStyle fontSize="14px" />
                        <HistoryProvider>
                            <Component {...pageProps} />
                        </HistoryProvider>
                    </FirestoreProvider>
                </FirebaseProvider>
            </AppProvider>
        </PersistGate>
    </Provider>
)

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps = {}
    let browserType = ''

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    browserType = browserChecker(ctx)

    return { pageProps, browserType }
}

export default MyApp
