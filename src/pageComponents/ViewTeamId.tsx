import {
    Colors,
    Container,
    Direction,
    FloatingIconButtonList,
    FloatingPosH,
    IFloatingIconButton,
    ISideMenuSection,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { Team, User } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import {
    AssignUserToTeamOverlay,
    TeamOverlay,
    UserOverlay,
    ViewTeamData,
    ViewTeamMembers
} from '../projectComponents'

export interface IViewTeamId {
    team?: Team
    setTeam: (data: Team) => void
}

export const ViewTeamId = (props: IViewTeamId) => {
    const router = useRouter()

    const [showEditTeam, setEditTeam] = useState(false)

    const [showAddNew, setShowNew] = useState(false)
    const [showAssignUsers, setShowAssignUsers] = useState(false)
    const [editUser, setEditUser] = useState<User>()

    const [dirtyTable, setDirtyTable] = useState(false)
    const [isOverlay, setIsOverlay] = useState(false)

    const checkActive = (section: ISideMenuSection) => {
        if (router.query.section == section.link) {
            return true
        } else if (router.query.section == null && section.link === 'View') {
            return true
        } else {
            return false
        }
    }

    const navFunc = (section?: ISideMenuSection) => {
        if (window.location.href.includes('my-team')) {
            router.push(`/my-team?section=` + section?.link, undefined, {
                shallow: true
            })
        } else {
            router.push(`/teams/${props.team?._id}?section=` + section?.link, undefined, {
                shallow: true
            })
        }
    }

    const handleDiscard = () => {
        setEditTeam(false)
    }

    const saveDrawer = (data?: Team) => {
        if (data) {
            props.setTeam(data)
        }
        setEditTeam(false)
    }

    const handleDiscardUser = () => {
        setShowNew(false)
        setEditUser(undefined)
        setIsOverlay(false)
    }

    const saveDrawerUser = () => {
        setEditUser(undefined)
        setShowNew(false)
        setIsOverlay(false)
        setDirtyTable(true)
    }

    const handleDiscardAssign = () => {
        setShowAssignUsers(false)
    }

    const saveDrawerAssign = (team?: Team) => {
        if (team) {
            props.setTeam(team)
        }
        setShowAssignUsers(false)
        setDirtyTable(true)
    }

    const getSections = (team: Team) => {
        return [
            {
                link: 'View',
                children: <ViewTeamData team={team} />
            },
            {
                link: 'Members',
                children: (
                    <ViewTeamMembers
                        team={team}
                        setTeam={props.setTeam}
                        dirtyTable={dirtyTable}
                        setDirtyTable={setDirtyTable}
                        setShowNew={setShowNew}
                        setEditUser={setEditUser}
                        setIsOverlay={setIsOverlay}
                    />
                )
            }
        ]
    }

    const getFloatingButtons = useCallback(() => {
        const buttons: IFloatingIconButton[] = []

        buttons.push({
            width: 'auto',
            onClick: async () => {
                setEditTeam(true)
            },
            children: <Typography color={Colors.textOnPrimary}>Edit Team</Typography>
        })

        buttons.push({
            width: 'auto',
            onClick: async () => {
                setShowAssignUsers(true)
            },
            children: <Typography color={Colors.textOnPrimary}>Assign Members</Typography>
        })

        return buttons
    }, [])

    return (
        <>
            <SidebarPage>
                <Container width="100%" padding="0">
                    {!props.team ? (
                        <QuadSpinner />
                    ) : (
                        <SideMenu
                            titleWidth="35%"
                            checkActive={checkActive}
                            navFunc={navFunc}
                            title={props.team.name}
                            description={`ID: ${props.team._id}`}
                            sections={getSections(props.team)}
                        />
                    )}
                </Container>
            </SidebarPage>

            <FloatingIconButtonList
                direction={Direction.rowReverse}
                horizontalPos={FloatingPosH.right}
                right="40px"
                bottom="30px"
                zIndex={5}
                buttons={getFloatingButtons()}
            />
            <TeamOverlay
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditTeam}
                data={props.team}
            />
            <UserOverlay
                onClose={handleDiscardUser}
                onSave={saveDrawerUser}
                show={showAddNew}
                data={editUser}
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
            <AssignUserToTeamOverlay
                team={props.team}
                show={showAssignUsers}
                onSave={saveDrawerAssign}
                onClose={handleDiscardAssign}
            />
        </>
    )
}
