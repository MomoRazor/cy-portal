import {
    APICallResult,
    AuthContext,
    AuthPage,
    ExtraDataHandler,
    ForbiddenPage,
    IUrlData,
    SetExtraDataHandler
} from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useContext } from 'react'
import { firebaseConfig, hydrateDate } from '../auth'
import { getAuth } from 'firebase/auth'

export interface ICYPage {
    loginRequired?: boolean
    breadCrumb?: IUrlData[]
    title?: string
    loadExtraDetail?: ExtraDataHandler
    setExtraData?: SetExtraDataHandler
    adminOnly?: boolean
    children: ReactNode
}

export const CYPage = ({ loadExtraDetail, ...props }: ICYPage) => {
    const { login, logout, user } = useContext(AuthContext)
    const router = useRouter()

    const handleRenderSelection = () => {
        if (props.adminOnly) {
            if (user?.isAdmin) {
                return props.children
            } else {
                return <ForbiddenPage />
            }
        } else {
            return props.children
        }
    }

    const apiCall = useCallback(async () => {
        const firebaseAuth = getAuth()
        const user = firebaseAuth.currentUser

        const result = await hydrateDate(user)

        if (result.result === APICallResult.success) {
            login && login(result.data)
        }

        return result
    }, [login])

    return (
        <AuthPage
            logout={async () => {
                const firebaseAuth = getAuth()
                try {
                    await firebaseAuth.signOut()
                    logout && logout()
                    router.push('/')
                } catch (e) {
                    console.error(e)
                }
            }}
            title={props.title}
            loginRequired={props.loginRequired}
            renderSelection={handleRenderSelection}
            apiCall={apiCall}
            firebaseConfig={firebaseConfig}
            breadCrumb={props.breadCrumb}
            loadExtraData={loadExtraDetail}
            setExtraData={props.setExtraData}
        />
    )
}
