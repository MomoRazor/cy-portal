import { AuthContext, LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CYPage, User, ViewUserId } from '../src'

const View = () => {
    const router = useRouter()
    const auth = useContext(AuthContext)
    const [userData, setUserData] = useState<User>(auth.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage title="Profile" breadCrumb={[{ display: 'Profile' }]} loginRequired>
            <ViewUserId user={userData} setUser={setUserData} profile />
        </CYPage>
    )
}

export default View
