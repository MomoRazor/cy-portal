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
import { ICommunity, IUser } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import {
    CommunityOverlay,
    UserOverlay,
    ViewCommunityData,
    ViewCommunityGuides,
    ViewCommunityMembers
} from '../projectComponents'

export interface IViewCommunityId {
    community?: ICommunity
    setCommunity: (data: ICommunity) => void
}

export const ViewCommunityId = (props: IViewCommunityId) => {
    const router = useRouter()

    const auth = useContext(AuthContext)

    const [showEditCommunity, setEditCommunity] = useState(false)

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
        if (window.location.href.includes('my-community')) {
            router.push(`/my-community?section=` + section?.link, undefined, {
                shallow: true
            })
        } else {
            router.push(`/communities/${props.community?.id}?section=` + section?.link, undefined, {
                shallow: true
            })
        }
    }

    const handleDiscard = () => {
        setEditCommunity(false)
    }

    const saveDrawer = (data?: ICommunity) => {
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

    const getSections = (community: ICommunity) => {
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
                    {!props.community ? (
                        <QuadSpinner />
                    ) : (
                        <SideMenu
                            titleWidth="35%"
                            checkActive={checkActive}
                            navFunc={navFunc}
                            title={props.community.name}
                            description={`ID: ${props.community.id}`}
                            sections={getSections(props.community)}
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
                        setEditCommunity(true)
                    }}
                    zIndex={5}
                >
                    <Typography color={Colors.textOnPrimary}>Edit Community</Typography>
                </FloatingIconButton>
            ) : (
                <></>
            )}
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
        </>
    )
}
