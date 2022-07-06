import {
    AuthContext,
    Colors,
    Container,
    FloatingIconButton,
    FloatingPosH,
    ISideMenuSection,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { ITeam, IUser } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import { TeamOverlay, UserOverlay, ViewTeamData, ViewTeamMembers } from '../projectComponents'

export interface IViewTeamId {
    team?: ITeam
    setTeam: (data: ITeam) => void
}

export const ViewTeamId = (props: IViewTeamId) => {
    const router = useRouter()

    const auth = useContext(AuthContext)

    const [showEditTeam, setEditTeam] = useState(false)

    const [showAddNew, setShowNew] = useState(false)
    const [editUser, setEditUser] = useState<IUser>()

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
            router.push(`/teams/${props.team?.id}?section=` + section?.link, undefined, {
                shallow: true
            })
        }
    }

    const handleDiscard = () => {
        setEditTeam(false)
    }

    const saveDrawer = (data?: ITeam) => {
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
    }

    const getSections = (team: ITeam) => {
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
                        setShowNew={setShowNew}
                        setEditUser={setEditUser}
                        setIsOverlay={setIsOverlay}
                    />
                )
            }
        ]
    }

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
                            description={`ID: ${props.team.id}`}
                            sections={getSections(props.team)}
                        />
                    )}
                </Container>
            </SidebarPage>
            {auth.user.isAdmin ? (
                <FloatingIconButton
                    horizontalPos={FloatingPosH.right}
                    width="auto"
                    right="40px"
                    bottom="30px"
                    onClick={() => {
                        setEditTeam(true)
                    }}
                    zIndex={5}
                >
                    <Typography color={Colors.textOnPrimary}>Edit Team</Typography>
                </FloatingIconButton>
            ) : (
                <></>
            )}
            <TeamOverlay
                covered
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditTeam}
                data={props.team}
            />
            <UserOverlay
                covered
                onClose={handleDiscardUser}
                onSave={saveDrawerUser}
                show={showAddNew}
                data={editUser}
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
        </>
    )
}
