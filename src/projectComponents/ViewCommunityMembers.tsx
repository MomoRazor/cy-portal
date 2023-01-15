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
import { ReactNode, useCallback, useMemo } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { Community, User, getUserTable, unassignUserFromCommunityAsMember } from '../restAPI'
import { RbacLinker } from './RBACLinker'

export interface IViewCommunityMembers {
    community: Community
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: User) => void
    setIsOverlay: (newOverlay: boolean) => void
    myCommunity?: boolean
}

interface UserRow extends User {
    actions: ReactNode
    communityGuide: ReactNode
    teamMember: ReactNode
    roles: string
}

export const ViewCommunityMembers = ({
    setEditUser,
    setShowNew,
    setIsOverlay,
    ...props
}: IViewCommunityMembers) => {
    const parseData = (data: User[]) => {
        let array: UserRow[] = []

        data.map((data) => {
            return array.push({
                ...data,
                communityGuide: data.communityGuideOf?.map((community) => (
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
                roles: data.roleNames.join(', '),
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) =>
            !props.myCommunity ? (
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
                            await unassignUserFromCommunityAsMember(data._id, props.community._id)
                        }}
                    >
                        <BiEditAlt />
                    </IconButton>
                </Container>
            ) : (
                <></>
            ),
        [props.community._id, props.myCommunity, setEditUser, setIsOverlay, setShowNew]
    )

    const apiCall = useCallback(async () => {
        return await getUserTable({
            filter: {
                _id: {
                    $in: props.community.memberIds
                }
            }
        })
    }, [props.community.memberIds])

    const headers = useMemo(
        () => [
            { id: 'name', title: 'Name' },
            { id: 'surname', title: 'Surname' },
            { id: 'email', title: 'Email' },
            { id: 'teamMember', title: 'Teams' },
            { id: 'roles', title: 'Roles' },
            { id: 'actions', title: 'Actions' }
        ],
        []
    )

    return (
        <Container padding="0">
            <Typography variant={TextVariants.h4} color={Colors.title}>
                Community Members
            </Typography>
            <Spacer height="20px" />

            <Table
                apiCall={apiCall}
                parseRows={parseData}
                headers={headers}
                keyName="id"
                pagination={false}
            />
        </Container>
    )
}
