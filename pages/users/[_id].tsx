import { LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CYPage, getUser, IUser, ViewUserId } from '../../src'
// import { mockUser } from '../../src/mock'

const View = () => {
    const router = useRouter()
    const [userData, setUserData] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    const getUserData = async () => {
        return await getUser(router.query._id ? router.query._id.toString() : '')
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title={userData?.displayName}
            breadCrumb={[
                { display: 'Home', id: '/profile' },
                { display: userData?.displayName || '' }
            ]}
            loadExtraDetail={getUserData}
            setExtraData={setUserData}
            adminOnly
            loginRequired
        >
            <ViewUserId user={userData} setUser={setUserData} />
        </CYPage>
    )
}

export default View
