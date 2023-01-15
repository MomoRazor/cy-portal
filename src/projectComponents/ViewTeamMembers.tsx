import {
    AuthContext,
    Colors,
    Container,
    Direction,
    IconButton,
    Linker,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useContext } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { getUserTable, Team, User, unassignUserFromTeam } from '../restAPI'

export interface IViewTeamMembers {
    team: Team
    dirtyTable: boolean
    setDirtyTable: (newDirty: boolean) => void
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: User) => void
    setIsOverlay: (newOverlay: boolean) => void
}

interface UserRow extends User {
    actions: ReactNode
    communityGuide: ReactNode
    communityMember: ReactNode
    roles: ReactNode
}

export const ViewTeamMembers = ({
    setEditUser,
    setShowNew,
    setIsOverlay,
    ...props
}: IViewTeamMembers) => {
    const auth = useContext(AuthContext)
    const parseData = (result: { data: User[] }) => {
        let array: UserRow[] = []

        result.data.map((data) => {
            return array.push({
                ...data,
                communityMember: data.communityMemberOf?.map((communtiy) => (
                    <Linker href={`/communities/${communtiy._id}/`} key={communtiy._id}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {communtiy.name || ''}
                        </Typography>
                    </Linker>
                )),
                communityGuide:
                    data.communityGuideOf?.map((community) => (
                        <Linker key={community._id} href={`/communities/${community._id}/`}>
                            <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                                {community.name || ''}
                            </Typography>
                        </Linker>
                    )) || [],
                roles: <Typography>{data.roleNames.join(', ')}</Typography>,
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) =>
            auth.user.isAdmin || auth.user._id === data._id ? (
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
                    {auth.user.isAdmin ? (
                        <IconButton
                            onClick={async () => {
                                await unassignUserFromTeam(data._id, props.team._id)
                            }}
                        >
                            <BiEditAlt />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </Container>
            ) : (
                <></>
            ),
        [auth.user._id, auth.user.isAdmin, props.team._id, setEditUser, setIsOverlay, setShowNew]
    )

    const apiCall = useCallback(async () => {
        return await getUserTable({
            filter: {
                _id: {
                    $in: props.team.memberIds
                }
            }
        })
    }, [props.team.memberIds])

    return (
        <Container padding="0">
            <Typography variant={TextVariants.h4} color={Colors.title}>
                Team Members
            </Typography>
            <Spacer height="20px" />

            <Table
                apiCall={apiCall}
                parseRows={parseData}
                headers={[
                    { id: 'displayName', title: 'Full Name' },
                    { id: 'email', title: 'Email' },
                    { id: 'communityMember', title: 'Community' },
                    { id: 'communityGuide', title: 'Guide Of' },
                    { id: 'roles', title: 'Roles' },
                    { id: 'actions', title: 'Actions' }
                ]}
                keyName="id"
                dirty={props.dirtyTable}
                setDirty={props.setDirtyTable}
                pagination={false}
            />
        </Container>
    )
}
