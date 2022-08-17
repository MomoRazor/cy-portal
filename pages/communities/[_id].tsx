import { LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CYPage, getCommunity, ICommunity, ViewCommunityId } from '../../src'
// import { mockCommunity } from '../../src/mock'

const View = () => {
    const router = useRouter()
    const [communityData, setCommunityData] = useState<ICommunity>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    const getCommunityData = async () => {
        return await getCommunity(router.query._id ? router.query._id.toString() : '')
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title={communityData?.name}
            breadCrumb={[
                { display: 'Home', id: '/profile' },
                { display: communityData?.name || '' }
            ]}
            loadExtraDetail={getCommunityData}
            setExtraData={setCommunityData}
            adminOnly
            loginRequired
        >
            <ViewCommunityId community={communityData} setCommunity={setCommunityData} />
        </CYPage>
    )
}

export default View
