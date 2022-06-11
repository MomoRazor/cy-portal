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
    admin?: ReactNode
    club?: ReactNode
    musician?: ReactNode
    breadCrumb?: IUrlData[]
    title?: string
    loadExtraDetail?: ExtraDataHandler
    setExtraData?: SetExtraDataHandler
    children?: ReactNode
}

export const CYPage = ({ loadExtraDetail, ...props }: ICYPage) => {
    const { login, logout } = useContext(AuthContext)
    const router = useRouter()

    const handleRenderSelection = () => {
        if (props.children) {
            return props.children
        } else {
            const portalType = getPortalType()
            if (portalType === PortalTypes.admin) {
                return props.admin || <ForbiddenPage />
            } else if (portalType === PortalTypes.manager) {
                return props.club || <ForbiddenPage />
            } else if (portalType === PortalTypes.musician) {
                return props.musician || <ForbiddenPage />
            } else {
                return <ForbiddenPage />
            }
        }
    }

    const apiCall = useCallback(async () => {
        const firebaseAuth = getAuth()
        const user = firebaseAuth.currentUser

        const portalType = getPortalType()

        const result = await hydrateDate(portalType, user)

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
                    clearLocalData()
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
