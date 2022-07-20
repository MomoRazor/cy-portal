import {
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    Linker,
    PillContainer,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { UserOverlay } from '../projectComponents'
import { getUsers, IUser } from '../restAPI'
import { SidebarPage } from './SidebarPage'

interface UserRow extends IUser {
    actions: ReactNode
    communityMember: ReactNode
    communityGuide: ReactNode
    teamMember: ReactNode
    admin: ReactNode
}

export const ViewUsers = () => {
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
                teamMember:
                    data.teamMemberOf?.map((team) => (
                        <Linker key={team.id} to={`/teams/${team.id}/`}>
                            <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                                {team.name || ''}
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
                            apiCall={getUsers}
                            parseRows={parseData}
                            headers={[
                                { id: 'name', title: 'Name' },
                                { id: 'surname', title: 'Surname' },
                                { id: 'email', title: 'Email' },
                                { id: 'communityMember', title: 'Community' },
                                { id: 'communityGuide', title: 'Guide Of' },
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
