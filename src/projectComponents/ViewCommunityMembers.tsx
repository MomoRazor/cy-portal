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
import { getUserMembersOfCommunity, ICommunity, IUser } from '../restAPI'

export interface IViewCommunityMembers {
    community: ICommunity
    setShowNew: (newShow: boolean) => void
    setEditUser: (newUser: IUser) => void
    setIsOverlay: (newOverlay: boolean) => void
}

interface UserRow extends IUser {
    actions: ReactNode
    communityGuide: ReactNode
    teamMember: ReactNode
    admin: ReactNode
}

export const ViewCommunityMembers = ({
    setEditUser,
    setShowNew,
    setIsOverlay,
    ...props
}: IViewCommunityMembers) => {
    const auth = useContext(AuthContext)

    const parseData = (data: IUser[]) => {
        let array: UserRow[] = []

        data.map((data) => {
            return array.push({
                ...data,
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
                </Container>
            ) : (
                <></>
            ),
        [auth.user.id, auth.user.isAdmin, setEditUser, setIsOverlay, setShowNew]
    )

    const apiCall = useCallback(async () => {
        return await getUserMembersOfCommunity(props.community.id)
    }, [props.community.id])

    const headers = useMemo(
        () =>
            auth.user.isAdmin
                ? [
                      { id: 'name', title: 'Name' },
                      { id: 'surname', title: 'Surname' },
                      { id: 'email', title: 'Email' },
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
