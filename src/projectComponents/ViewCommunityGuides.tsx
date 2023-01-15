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
import { Community, User, getUserTable, unassignUserFromCommunityAsGuide } from '../restAPI'
import { RbacLinker } from './RBACLinker'

export interface IViewCommunityGuides {
    community: Community
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: User) => void
    setIsOverlay: (newOverlay: boolean) => void
    myCommunity?: boolean
}

interface UserRow extends User {
    actions: ReactNode
    communityMember: ReactNode
    teamMember: ReactNode
    roles: string
}

export const ViewCommunityGuides = ({
    setShowNew,
    setEditUser,
    setIsOverlay,
    ...props
}: IViewCommunityGuides) => {
    const parseData = (data: User[]) => {
        let array: UserRow[] = []

        data.map((data) => {
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
                            await unassignUserFromCommunityAsGuide(data._id, props.community._id)
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
                    $in: props.community.guideIds
                }
            }
        })
    }, [props.community.guideIds])

    const headers = useMemo(
        () => [
            { id: 'name', title: 'Name' },
            { id: 'surname', title: 'Surname' },
            { id: 'email', title: 'Email' },
            { id: 'communityMember', title: 'Community' },
            { id: 'teamMember', title: 'Team' },
            { id: 'admin', title: 'Is an Admin' },
            { id: 'actions', title: 'Actions' }
        ],
        []
    )

    return (
        <Container padding="0">
            <Typography variant={TextVariants.h4} color={Colors.title}>
                Community Guides
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
