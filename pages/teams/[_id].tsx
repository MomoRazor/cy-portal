import { LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CYPage, getTeam, ITeam, ViewTeamId } from '../../src'
// import { mockTeam } from '../../src/mock'

const View = () => {
    const router = useRouter()
    const [teamData, setTeamData] = useState<ITeam>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false)
        }
    }, [router.isReady])

    const getTeamData = async () => {
        return await getTeam(router.query._id ? router.query._id.toString() : '')
    }

    return isLoading ? (
        <LoadingPage />
    ) : (
        <CYPage
            title={teamData?.name}
            breadCrumb={[{ display: 'Home', id: '/profile' }, { display: teamData?.name || '' }]}
            loadExtraDetail={getTeamData}
            setExtraData={setTeamData}
            adminOnly
            loginRequired
        >
            <ViewTeamId team={teamData} setTeam={setTeamData} />
        </CYPage>
    )
}

export default View
