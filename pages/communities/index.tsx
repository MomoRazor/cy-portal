import { CYPage, ViewCommunities } from '../../src'

const ViewCommunitiesPage = () => (
    <CYPage
        title="Communities"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Communities' }]}
        adminOnly
        loginRequired
    >
        <ViewCommunities />
    </CYPage>
)

export default ViewCommunitiesPage
