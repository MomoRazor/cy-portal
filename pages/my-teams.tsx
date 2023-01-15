import { CYPage, ViewTeams } from '../src'

const ViewMyTeamsPage = () => (
    <CYPage
        title="My Teams"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'My Teams' }]}
        loginRequired
    >
        <ViewTeams myTeams />
    </CYPage>
)

export default ViewMyTeamsPage
