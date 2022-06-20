import { AuthContext, LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { CYPage, getUser, IUser, ViewUserId } from '../src'

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
        if (auth.user?._id) {
            setUserData(await getUser(auth.user?._id))
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
            <ViewUserId user={userData} setUser={setUserData} />
        </CYPage>
    )
}

export default View
