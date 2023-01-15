import {
    Colors,
    Container,
    Direction,
    IconButton,
    PointerEvents,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { getUserTable, Team, User, unassignUserFromTeam } from '../restAPI'
import { RbacLinker } from './RBACLinker'

export interface IViewTeamMembers {
    team: Team
    dirtyTable: boolean
    setDirtyTable: (newDirty: boolean) => void
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: User) => void
    setIsOverlay: (newOverlay: boolean) => void
    myTeam?: boolean
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
    const parseData = (result: { data: User[] }) => {
        let array: UserRow[] = []

        result.data.map((data) => {
            return array.push({
                ...data,
                communityMember: data.communityMemberOf?.map((communtiy) => (
                    <RbacLinker href={`/communities/${communtiy._id}/`} key={communtiy._id}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {communtiy.name || ''}
                        </Typography>
                    </RbacLinker>
                )),
                communityGuide: data.communityGuideOf?.map((community) => (
                    <RbacLinker key={community._id} href={`/communities/${community._id}/`}>
                        <Typography color={Colors.primary} pointerEvents={PointerEvents.none}>
                            {community.name || ''}
                        </Typography>
                    </RbacLinker>
                )) || <></>,
                roles: <Typography>{data.roleNames.join(', ')}</Typography>,
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) =>
            !props.myTeam ? (
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
                    <IconButton
                        onClick={async () => {
                            await unassignUserFromTeam(data._id, props.team._id)
                        }}
                    >
                        <BiEditAlt />
                    </IconButton>
                </Container>
            ) : (
                <></>
            ),
        [props.myTeam, props.team._id, setEditUser, setIsOverlay, setShowNew]
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
