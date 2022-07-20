import React from 'react'
import { CYPage, ViewCommunities } from '../src'

const ViewGuidingCommunitiesPage = () => (
    <CYPage
        title="Guiding Communities"
        breadCrumb={[{ display: 'Home', id: '/profile' }, { display: 'Guiding Communities' }]}
        adminOnly
        //TODO Enable
        // loginRequired
    >
        <ViewCommunities guidingCommunity />
    </CYPage>
)

export default ViewGuidingCommunitiesPage
