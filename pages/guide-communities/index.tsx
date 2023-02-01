import { CYPage, ViewCommunities } from '../../src'

const ViewGuidingCommunitiesPage = () => (
    <CYPage
        title="Guiding Communities"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Guiding Communities' }]}
        loginRequired
    >
        <ViewCommunities guidingCommunities />
    </CYPage>
)

export default ViewGuidingCommunitiesPage
