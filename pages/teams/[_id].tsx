import { LoadingPage } from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CYPage, getTeam, Team, ViewTeamId } from '../../src'

const View = () => {
    const router = useRouter()
    const [teamData, setTeamData] = useState<Team>()
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
            breadCrumb={[
                { display: 'Home', id: '/profile' },
                { display: 'Team', id: '/teams' },
                { display: teamData?.name || '' }
            ]}
            loadExtraDetail={getTeamData}
            setExtraData={setTeamData}
            loginRequired
        >
            <ViewTeamId team={teamData} setTeam={setTeamData} />
        </CYPage>
    )
}

export default View
