import {
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { RbacLinker, UserOverlay } from '../projectComponents'
import { User, getUserTable } from '../restAPI'
import { SidebarPage } from './SidebarPage'

interface UserRow extends User {
    actions: ReactNode
    communityMember: ReactNode
    communityGuide: ReactNode
    teamMember: ReactNode
    roles: string
}

export const ViewUsers = () => {
    const [showAddNew, setShowNew] = useState(false)
    const [editUser, setEditUser] = useState<User>()

    const [isOverlay, setIsOverlay] = useState(false)

    const [userDirty, setUserDirty] = useState(false)

    const parseData = (result: { data: User[]; total: number }) => {
        let array: UserRow[] = []

        result.data.map((data) => {
            return array.push({
                ...data,
                communityMember: data.communityMemberOf?.map((community) => (
                    <RbacLinker key={community._id} href={`/communities/${community._id}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {community.name || ''}
                        </Typography>
                    </RbacLinker>
                )) || <></>,
                teamMember: data.teamMemberOf?.map((team) => (
                    <RbacLinker key={team._id} href={`/teams/${team._id}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {team.name || ''}
                        </Typography>
                    </RbacLinker>
                )) || <></>,
                communityGuide: data.communityGuideOf?.map((community) => (
                    <RbacLinker key={community._id} href={`/communities/${community._id}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {community.name || ''}
                        </Typography>
                    </RbacLinker>
                )) || <></>,
                roles: data.roleNames.join(', '),
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) => (
            <Container direction={Direction.row} padding="0">
                <RbacLinker href={`/users/${data._id}/`} hocLink>
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </RbacLinker>
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
        setUserDirty(true)
    }

    return (
        <>
            <SidebarPage>
                <Container width="100%">
                    <Typography variant={TextVariants.h4} color={Colors.title}>
                        Users
                    </Typography>
                    <Spacer height="20px" />

                    <Card>
                        <Table
                            apiCall={getUserTable}
                            parseRows={parseData}
                            headers={[
                                { id: 'displayName', title: 'Display Name' },
                                { id: 'email', title: 'Email' },
                                { id: 'communityMember', title: 'Community' },
                                { id: 'teamMember', title: 'Team' },
                                { id: 'roles', title: 'Roles' },
                                { id: 'actions', title: 'Actions' }
                            ]}
                            keyName="id"
                            pagination={false}
                            dirty={userDirty}
                            setDirty={setUserDirty}
                        />
                    </Card>
                </Container>
            </SidebarPage>
            <FloatingIconButton
                horizontalPos={FloatingPosH.right}
                right="40px"
                bottom="30px"
                width="auto"
                onClick={() => {
                    setShowNew(true)
                    setIsOverlay(true)
                }}
                zIndex={5}
            >
                <Typography color={Colors.textOnPrimary}>Add User</Typography>
            </FloatingIconButton>
            <UserOverlay
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
