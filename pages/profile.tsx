import { AuthContext, LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CYPage, getUser, IUser, ViewUserId } from '../src'
import { mockUser } from '../src/mock'

const View = () => {
    const router = useRouter()
    const auth = useContext(AuthContext)
    const [userData, setUserData] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    const getUserData = async () => {
        if (auth.user?.id) {
            const data = await getUser(auth.user?.id)
            setUserData(data)
        } else {
            return
        }
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title="Profile"
            breadCrumb={[{ display: 'Profile' }]}
            loadExtraDetail={getUserData}
            setExtraData={setUserData}
            // loginRequired
        >
            {/* TODO remove mock Data */}
            <ViewUserId user={userData || mockUser} setUser={setUserData} />
        </CYPage>
    )
}

export default View
