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
        if (router.query.id) {
            setUserData(await getUser(router.query.id.toString()))
        } else {
            return
        }
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title={userData?.name}
            breadCrumb={[{ display: 'Home', id: '/profile' }, { display: userData?.name || '' }]}
            loadExtraDetail={getUserData}
            setExtraData={setUserData}
            adminOnly
            //TODO Enable
            // loginRequired
        >
            {/* TODO remove mock Data */}
            <ViewUserId
                user={
                    userData
                    // || mockUser
                }
                setUser={setUserData}
            />
        </CYPage>
    )
}

export default View
