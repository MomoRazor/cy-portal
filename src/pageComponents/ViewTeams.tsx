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
import { getTeams, getUserTeams, ITeam } from '../restAPI'
import { SidebarPage } from './SidebarPage'

interface TeamRow extends ITeam {
    actions: ReactNode
}

export interface IViewTeams {
    myTeams?: boolean
}

export const ViewTeams = (props: IViewTeams) => {
    const auth = useContext(AuthContext)

    const [showAddNew, setShowNew] = useState(false)
    const [editTeam, setEditTeam] = useState<ITeam>()

    const [isOverlay, setIsOverlay] = useState(false)

    const parseData = (data: ITeam[]) => {
        let array: TeamRow[] = []

        data.map((data) => {
            return array.push({
                ...data,
                actions: actionsRow(data)
            })
        })
        return array
    }

    const actionsRow = useCallback(
        (data: ITeam) => (
            <Container direction={Direction.row} padding="0">
                <Linker to={`/teams/${data.id}/`} width="auto">
                    <IconButton>
                        <BiShowAlt />
                    </IconButton>
                </Linker>
                <IconButton
                    onClick={() => {
                        setEditTeam(data)
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
        setEditTeam(undefined)
        setIsOverlay(false)
    }

    const saveDrawer = () => {
        setEditTeam(undefined)
        setShowNew(false)
        setIsOverlay(false)
    }

    const onAddTeam = () => {
        setShowNew(true)
        setIsOverlay(true)
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
                            apiCall={props.myTeams ? () => getUserTeams(auth.user.id) : getTeams}
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
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
        </>
    )
}
