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
import { Community, User } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import {
    AssignGuideToCommunityOverlay,
    AssignUserToCommunityOverlay,
    CommunityOverlay,
    UserOverlay,
    ViewCommunityData,
    ViewCommunityGuides,
    ViewCommunityMembers
} from '../projectComponents'

export interface IViewCommunityId {
    community?: Community
    setCommunity: (data: Community) => void
}

export const ViewCommunityId = (props: IViewCommunityId) => {
    const router = useRouter()

    const [showEditCommunity, setEditCommunity] = useState(false)
    const [showAssignGuide, setShowAssignGuide] = useState(false)
    const [showAssignMember, setShowAssignMember] = useState(false)

    const [showAddNew, setShowNew] = useState(false)
    const [editUser, setEditUser] = useState<User>()

    const [dirtyTableGuide, setDirtyTableGuide] = useState(false)
    const [dirtyTableMember, setDirtyTableMember] = useState(false)

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
        if (window.location.href.includes('my-communities')) {
            router.push(`/my-communities?section=` + section?.link, undefined, {
                shallow: true
            })
        } else {
            router.push(
                `/communities/${props.community?._id}?section=` + section?.link,
                undefined,
                {
                    shallow: true
                }
            )
        }
    }

    const handleDiscard = () => {
        setEditCommunity(false)
    }

    const saveDrawer = (data?: Community) => {
        if (data) {
            props.setCommunity(data)
        }
        setEditCommunity(false)
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

    const getFloatingButtons = useCallback(() => {
        const buttons: IFloatingIconButton[] = []

        buttons.push({
            width: 'auto',
            onClick: async () => {
                setEditCommunity(true)
            },
            children: <Typography color={Colors.textOnPrimary}>Edit Community</Typography>
        })

        buttons.push({
            width: 'auto',
            onClick: async () => {
                setShowAssignGuide(true)
            },
            children: <Typography color={Colors.textOnPrimary}>Assign Guide</Typography>
        })

        buttons.push({
            width: 'auto',
            onClick: async () => {
                setShowAssignMember(true)
            },
            children: <Typography color={Colors.textOnPrimary}>Assign Member</Typography>
        })

        return buttons
    }, [])

    const getSections = (community: Community) => {
        return [
            {
                link: 'View',
                children: <ViewCommunityData community={community} />
            },
            {
                link: 'Guides',
                children: (
                    <ViewCommunityGuides
                        community={community}
                        dirtyTable={dirtyTableGuide}
                        setDirtyTable={setDirtyTableGuide}
                        setCommunity={props.setCommunity}
                        setShowNew={setShowNew}
                        setEditUser={setEditUser}
                        setIsOverlay={setIsOverlay}
                    />
                )
            },
            {
                link: 'Members',
                children: (
                    <ViewCommunityMembers
                        community={community}
                        dirtyTable={dirtyTableMember}
                        setDirtyTable={setDirtyTableMember}
                        setCommunity={props.setCommunity}
                        setShowNew={setShowNew}
                        setEditUser={setEditUser}
                        setIsOverlay={setIsOverlay}
                    />
                )
            }
        ]
    }

    const handleDiscardAssignMember = () => {
        setShowAssignMember(false)
    }

    const saveDrawerAssignMember = (community?: Community) => {
        if (community) {
            props.setCommunity(community)
        }
        setShowAssignMember(false)
        setDirtyTableMember(true)
    }

    const handleDiscardAssignGuide = () => {
        setShowAssignGuide(false)
    }

    const saveDrawerAssignGuide = (community?: Community) => {
        if (community) {
            props.setCommunity(community)
        }
        setShowAssignGuide(false)
        setDirtyTableGuide(true)
    }

    return (
        <>
            <SidebarPage>
                <Container width="100%" padding="0">
                    {!props.community ? (
                        <QuadSpinner />
                    ) : (
                        <SideMenu
                            titleWidth="35%"
                            checkActive={checkActive}
                            navFunc={navFunc}
                            title={props.community.name}
                            description={`ID: ${props.community._id}`}
                            sections={getSections(props.community)}
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
            <CommunityOverlay
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditCommunity}
                data={props.community}
            />
            <UserOverlay
                onClose={handleDiscardUser}
                onSave={saveDrawerUser}
                show={showAddNew}
                data={editUser}
                isOverlay={isOverlay}
                setIsOverlay={setIsOverlay}
            />
            <AssignUserToCommunityOverlay
                community={props.community}
                show={showAssignMember}
                onSave={saveDrawerAssignMember}
                onClose={handleDiscardAssignMember}
            />
            <AssignGuideToCommunityOverlay
                community={props.community}
                show={showAssignGuide}
                onSave={saveDrawerAssignGuide}
                onClose={handleDiscardAssignGuide}
            />
        </>
    )
}
