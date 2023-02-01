import { CYPage, ViewCommunities } from '../../src'

const ViewMyCommunitiesPage = () => (
    <CYPage
        title="My Communities"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'My Communities' }]}
        loginRequired
    >
        <ViewCommunities myCommunities />
    </CYPage>
)

export default ViewMyCommunitiesPage
