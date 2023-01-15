import { CYPage, ViewUsers } from '../../src'

const ViewUsersPage = () => (
    <CYPage
        title="Users"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Users' }]}
        loginRequired
    >
        <ViewUsers />
    </CYPage>
)

export default ViewUsersPage
