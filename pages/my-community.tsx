import { AuthContext, LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CYPage, getCommunity, ICommunity, ViewCommunityId } from '../src'
// import { mockCommunity } from '../src/mock'

const View = () => {
    const router = useRouter()
    const auth = useContext(AuthContext)
    const [communityData, setCommunityData] = useState<ICommunity>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    const getCommunityData = async () => {
        return await getCommunity(auth.user?.communityMemberOfId)
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title="My Community"
            breadCrumb={[
                { display: 'Home', id: '/profile' },
                { display: communityData?.name || '' }
            ]}
            loadExtraDetail={getCommunityData}
            setExtraData={setCommunityData}
            loginRequired
        >
            <ViewCommunityId community={communityData} setCommunity={setCommunityData} />
        </CYPage>
    )
}

export default View
