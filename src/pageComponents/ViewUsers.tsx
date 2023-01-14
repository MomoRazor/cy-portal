import {
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    Linker,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { UserOverlay } from '../projectComponents'
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

    const parseData = (result: { data: User[]; total: number }) => {
        let array: UserRow[] = []

        result.data.map((data) => {
            return array.push({
                ...data,
                communityMember: data.communityMemberOf?.map((community) => (
                    <Linker key={community._id} href={`/communities/${community._id}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {community.name || ''}
                        </Typography>
                    </Linker>
                )) || <></>,
                teamMember:
                    data.teamMemberOf?.map((team) => (
                        <Linker key={team._id} href={`/teams/${team._id}/`}>
                            <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                                {team.name || ''}
                            </Typography>
                        </Linker>
                    )) || [],
                communityGuide:
                    data.communityGuideOf?.map((community) => (
                        <Linker key={community._id} href={`/communities/${community._id}/`}>
                            <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                                {community.name || ''}
                            </Typography>
                        </Linker>
                    )) || [],
                roles: data.roleNames.join(', '),
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) => (
            <Container direction={Direction.row} padding="0">
                <Linker href={`/users/${data._id}/`} hocLink>
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
                                { id: 'admin', title: 'Is an Admin' },
                                { id: 'actions', title: 'Actions' }
                            ]}
                            keyName="id"
                            pagination={false}
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
