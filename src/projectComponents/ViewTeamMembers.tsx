import {
    Card,
    Colors,
    Container,
    Direction,
    IconButton,
    Linker,
    PillContainer,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { ReactNode, useCallback, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { getUserMembersOfTeam, ITeam, IUser } from '../restAPI'
import { UserOverlay } from './forms'

export interface IViewTeamMembers {
    team: ITeam
}

interface UserRow extends IUser {
    actions: ReactNode
    communityGuide: ReactNode
    communityMember: ReactNode
    admin: ReactNode
}

export const ViewTeamMembers = (props: IViewTeamMembers) => {
    const [showAddNew, setShowNew] = useState(false)
    const [editUser, setEditUser] = useState<IUser>()

    const [isOverlay, setIsOverlay] = useState(false)

    const parseData = (data: IUser[]) => {
        let array: UserRow[] = []

        data.map((data) => {
            return array.push({
                ...data,
                communityMember: (
                    <Linker to={`/communities/${data.communityMemberOfId}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {data.communityMemberOf?.name || ''}
                        </Typography>
                    </Linker>
                ),
                communityGuide:
                    data.communityGuideOf?.map((community) => (
                        <Linker key={community.id} to={`/communities/${community.id}/`}>
                            <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                                {community.name || ''}
                            </Typography>
                        </Linker>
                    )) || [],
                admin: (
                    <PillContainer
                        text={data.isAdmin ? 'Yes' : 'No'}
                        color={data.isAdmin ? Colors.success : Colors.error}
                    />
                ),
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: IUser) => (
            <Container direction={Direction.row} padding="0">
                <Linker to={`/users/${data.id}/`} width="auto">
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </Linker>
                <IconButton
                    onClick={() => {
                        setEditUser(data)
                        setShowNew(true)
                        setIsOverlay(true)
                    }}
                >
                    <BiEditAlt />
                </IconButton>
            </Container>
        ),
        []
    )

    const handleDiscard = () => {
        setShowNew(false)
        setEditUser(undefined)
        setIsOverlay(false)
    }

    const saveDrawer = () => {
        setEditUser(undefined)
        setShowNew(false)
        setIsOverlay(false)
    }

    const apiCall = async () => {
        return await getUserMembersOfTeam(props.team.id)
    }

    return (
        <>
            <Container padding="0">
                <Typography variant={TextVariants.h4} color={Colors.title}>
                    Team Members
                </Typography>
                <Spacer height="20px" />

                <Card>
                    <Table
                        apiCall={apiCall}
                        parseRows={parseData}
                        headers={[
                            { id: 'name', title: 'Name' },
                            { id: 'surname', title: 'Surname' },
                            { id: 'email', title: 'Email' },
                            { id: 'communityMember', title: 'Community' },
                            { id: 'communityGuide', title: 'Guide Of' },
                            { id: 'admin', title: 'Is an Admin' },
                            { id: 'actions', title: 'Actions' }
                        ]}
                        keyName="id"
                        pagination={false}
                    />
                </Card>
            </Container>
            <UserOverlay
                covered
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showAddNew}
                data={editUser}
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
        </>
    )
}
