import {
    APICallResult,
    APICallReturn,
    AuthContext,
    AuthPageV2,
    Colors,
    ExtraDataHandler,
    IUrlData,
    LoadingPage,
    SetExtraDataHandler
} from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useContext, useState } from 'react'
import { hydrateData } from '../auth'
import { getAuth } from 'firebase/auth'
import { FirestoreContext, FirebaseContext } from '../projectComponents'
import { camLogout } from '../utils'
import { RBACForbiddenPage } from './RBACForbiddenPage'
import { checkPages } from '../nav'

export interface ICYPage {
    loginRequired?: boolean
    breadCrumb?: IUrlData[]
    title?: string
    loadExtraDetail?: ExtraDataHandler
    setExtraData?: SetExtraDataHandler
    children: ReactNode
}

export const CYPage = ({ loadExtraDetail, ...props }: ICYPage) => {
    const { login, logout } = useContext(AuthContext)
    const { pages } = useContext(FirestoreContext)
    const { status } = useContext(FirebaseContext)
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [forbidden, setForbidden] = useState(false)

    const handleRenderSelection = () =>
        props.loginRequired ? (
            loading ? (
                <LoadingPage />
            ) : forbidden ? (
                <RBACForbiddenPage logout={logoutFunc} allowBack lineColor={Colors.primary} />
            ) : (
                props.children
            )
        ) : (
            props.children
        )

    const apiCall = useCallback(async () => {
        const firebaseAuth = getAuth()
        const user = firebaseAuth.currentUser

        if (user) {
            try {
                const result = await hydrateData(user)

                if (result.data) {
                    login && login(result.data)
                    if (pages && checkPages(pages, window.location.origin, router.pathname)) {
                        setForbidden(false)
                    } else {
                        setForbidden(true)
                    }

                    setLoading(false)

                    const end: APICallReturn = {
                        result: APICallResult.success
                    }
                    return end
                } else {
                    const end: APICallReturn = {
                        result: APICallResult.denied
                    }

                    return end
                }
            } catch (e) {
                const end: APICallReturn = {
                    result: APICallResult.error
                }
                return end
            }
        } else {
            const end: APICallReturn = {
                result: APICallResult.denied
            }

            return end
        }
    }, [login, pages, router.pathname])

    const loadExtraData = useCallback(async () => {
        if (loadExtraDetail) {
            const response = await loadExtraDetail()
            return response.data
        }
    }, [loadExtraDetail])

    const logoutFunc = () => {
        if (logout) {
            camLogout(router, logout)
        } else {
            console.error('No logout found')
        }
    }

    return (
        <AuthPageV2
            logout={logoutFunc}
            title={props.title}
            loginRequired={props.loginRequired}
            renderSelection={handleRenderSelection}
            apiCall={apiCall}
            breadCrumb={props.breadCrumb}
            loadExtraData={loadExtraData}
            setExtraData={props.setExtraData}
            loginStatus={status}
        />
    )
}
