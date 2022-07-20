import {
    AuthContext,
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
import { ReactNode, useCallback, useContext, useMemo } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import {
    getUserGuidesOfCommunity,
    ICommunity,
    IUser,
    unassignUserFromCommunityAsGuide
} from '../restAPI'

export interface IViewCommunityGuides {
    community: ICommunity
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: IUser) => void
    setIsOverlay: (newOverlay: boolean) => void
}

interface UserRow extends IUser {
    actions: ReactNode
    communityMember: ReactNode
    teamMember: ReactNode
    admin: ReactNode
}

export const ViewCommunityGuides = ({
    setShowNew,
    setEditUser,
    setIsOverlay,
    ...props
}: IViewCommunityGuides) => {
    const auth = useContext(AuthContext)
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
        (data: IUser) =>
            auth.user.isAdmin || auth.user.id === data.id ? (
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
                    {auth.user.isAdmin ? (
                        <IconButton
                            onClick={async () => {
                                await unassignUserFromCommunityAsGuide(data.id, props.community.id)
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
        [auth.user.id, auth.user.isAdmin, props.community.id, setEditUser, setIsOverlay, setShowNew]
    )

    const apiCall = useCallback(async () => {
        return await getUserGuidesOfCommunity(props.community.id)
    }, [props.community.id])

    const headers = useMemo(
        () =>
            auth.user.isAdmin
                ? [
                      { id: 'name', title: 'Name' },
                      { id: 'surname', title: 'Surname' },
                      { id: 'email', title: 'Email' },
                      { id: 'communityMember', title: 'Community' },
                      { id: 'teamMember', title: 'Team' },
                      { id: 'admin', title: 'Is an Admin' },
                      { id: 'actions', title: 'Actions' }
                  ]
                : [
                      { id: 'name', title: 'Name' },
                      { id: 'surname', title: 'Surname' }
                  ],
        [auth.user.isAdmin]
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
