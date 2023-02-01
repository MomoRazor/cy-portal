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
import { BiShowAlt, BiEditAlt, BiX } from 'react-icons/bi'
import { Community, User, getUserTable, unassignUserFromCommunityAsGuide } from '../restAPI'
import { RbacLinker } from './RBACLinker'

export interface IViewCommunityGuides {
    community: Community
    dirtyTable: boolean
    setDirtyTable: (newDirty: boolean) => void
    setCommunity: (newCommunity: Community) => void
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: User) => void
    setIsOverlay: (newOverlay: boolean) => void
    myCommunity?: boolean
    guideCommunity?: boolean
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
    setCommunity,
    ...props
}: IViewCommunityGuides) => {
    const parseData = (result: { data: User[] }) => {
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
                roles: data.roleNames.join(', '),
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: User) =>
            !props.myCommunity && !props.guideCommunity ? (
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
                            const result = await unassignUserFromCommunityAsGuide(
                                data._id,
                                props.community._id
                            )
                            setCommunity(result.data)
                        }}
                    >
                        <BiX />
                    </IconButton>
                </Container>
            ) : (
                <></>
            ),
        [
            props.community._id,
            props.guideCommunity,
            props.myCommunity,
            setCommunity,
            setEditUser,
            setIsOverlay,
            setShowNew
        ]
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

    const headers = useMemo(() => {
        const heads = [
            { id: 'displayName', title: 'Full Name' },
            { id: 'email', title: 'Email' },
            { id: 'communityMember', title: 'Community' },
            { id: 'teamMember', title: 'Team' },
            { id: 'roles', title: 'Roles' }
        ]

        if (!props.myCommunity && !props.guideCommunity) {
            heads.push({ id: 'actions', title: 'Actions' })
        }

        return heads
    }, [props.guideCommunity, props.myCommunity])

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
                keyName="_id"
                dirty={props.dirtyTable}
                setDirty={props.setDirtyTable}
            />
        </Container>
    )
}
