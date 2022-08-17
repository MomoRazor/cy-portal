import React from 'react'
import { CYPage, ViewTeams } from '../../src'

const ViewTeamsPage = () => (
    <CYPage
        title="Teams"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Teams' }]}
        adminOnly
        loginRequired
    >
        <ViewTeams />
    </CYPage>
)

export default ViewTeamsPage
