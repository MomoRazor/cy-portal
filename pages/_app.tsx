import { AppProvider, NEXTGlobalStyle } from '@sector-eleven-ltd/se-react-toolkit'
import { FirebaseProvider, FirestoreProvider, themeConfig } from '../src'
import { AppProps } from 'next/dist/shared/lib/router/router'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <FirebaseProvider>
        <FirestoreProvider>
            <AppProvider theme={themeConfig}>
                <NEXTGlobalStyle fontSize="14px" />
                <Component {...pageProps} />
            </AppProvider>
        </FirestoreProvider>
    </FirebaseProvider>
)

export default MyApp
