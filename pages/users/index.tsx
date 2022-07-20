import React from 'react'
import { CYPage, ViewUsers } from '../../src'

const ViewUsersPage = () => (
    <CYPage
        title="Users"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Users' }]}
        adminOnly
        //TODO Enable
        // loginRequired
    >
        <ViewUsers />
    </CYPage>
)

export default ViewUsersPage
