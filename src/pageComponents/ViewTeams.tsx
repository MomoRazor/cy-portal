import {
    AuthContext,
    Card,
    Colors,
    Container,
    Direction,
    FloatingIconButton,
    FloatingPosH,
    IconButton,
    Linker,
    Spacer,
    Table,
    TextVariants,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { ReactNode, useCallback, useContext, useState } from 'react'
import { BiShowAlt, BiEditAlt } from 'react-icons/bi'
import { TeamOverlay } from '../projectComponents'
import { SidebarPage } from './SidebarPage'
import { Team, getTeamTable } from '../restAPI'

interface TeamRow extends Team {
    actions: ReactNode
}

export interface IViewTeams {
    myTeams?: boolean
}

export const ViewTeams = (props: IViewTeams) => {
    const auth = useContext(AuthContext)

    const [showAddNew, setShowNew] = useState(false)
    const [editTeam, setEditTeam] = useState<Team>()

    const [dirty, setDirty] = useState(false)

    const parseData = (args: { data: Team[] }) => {
        let array: TeamRow[] = []

        args.data.map((data) => {
            return array.push({
                ...data,
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: Team) => (
            <Container direction={Direction.row} padding="0">
                <Linker href={`/teams/${data._id}/`} hocLink>
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </Linker>
                <IconButton
                    onClick={() => {
                        setEditTeam(data)
                        setShowNew(true)
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
        setEditTeam(undefined)
    }

    const saveDrawer = () => {
        setEditTeam(undefined)
        setShowNew(false)
        setDirty(true)
    }

    const onAddTeam = () => {
        setShowNew(true)
    }

    return (
        <>
            <SidebarPage>
                <Container width="100%">
                    <Typography variant={TextVariants.h4} color={Colors.title}>
                        {props.myTeams ? 'My Teams' : 'Teams'}
                    </Typography>
                    <Spacer height="20px" />

                    <Card>
                        <Table
                            dirty={dirty}
                            setDirty={setDirty}
                            apiCall={
                                props.myTeams
                                    ? () =>
                                          getTeamTable({
                                              filter: {
                                                  memberId: auth.user._id
                                              }
                                          })
                                    : getTeamTable
                            }
                            parseRows={parseData}
                            headers={[
                                { id: 'name', title: 'Name' },
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
                onClick={onAddTeam}
                zIndex={5}
            >
                <Typography color={Colors.textOnPrimary}>Add Team</Typography>
            </FloatingIconButton>
            <TeamOverlay
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showAddNew}
                data={editTeam}
            />
        </>
    )
}
