import { AuthPage, ForbiddenPage, IUrlData } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { ReactNode, useCallback } from 'react'
import { firebaseConfig, hydrateDate } from '../auth'
import { getAuth } from 'firebase/auth'

export interface ICYPage {
    loginRequired?: boolean
    breadCrumb?: IUrlData[]
    title?: string
    adminOnly?: boolean
    children: ReactNode
}

export const CYPage = (props: ICYPage) => {
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
                router.push('/logout')
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
