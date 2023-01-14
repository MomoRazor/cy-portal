import {
    AuthContext,
    Colors,
    Container,
    Direction,
    FloatingIconButtonList,
    FloatingPosH,
    IAdditionalData,
    IFloatingIconButton,
    ISideMenuSection,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { SidebarPage } from './SidebarPage'
import { UserOverlay, ViewUserData } from '../projectComponents'
import { User } from '../restAPI'

export interface IViewUserId {
    profile?: boolean
    user?: User
    setUser: (data: User) => void
}

export const ViewUserId = (props: IViewUserId) => {
    const router = useRouter()
    const [showEditUser, setEditUser] = useState(false)

    const { login } = useContext(AuthContext)

    const checkActive = (section: ISideMenuSection) => {
        if (router.query.section == section.link) {
            return true
        } else if (router.query.section == null && section.link === 'Profile') {
            return true
        } else {
            return false
        }
    }

    const navFunc = (section?: ISideMenuSection) => {
        if (window.location.href.includes('profile')) {
            router.push(`/profile?section=` + section?.link, undefined, {
                shallow: true
            })
        } else {
            router.push(`/users/${props.user?._id}?section=` + section?.link, undefined, {
                shallow: true
            })
        }
    }

    const handleDiscard = () => {
        setEditUser(false)
    }

    const saveDrawer = (data?: User) => {
        if (data) {
            props.setUser(data)
        }

        if (props.profile) {
            login && login(data)
        }
        setEditUser(false)
    }

    const getAdditionalData = () => {
        const additionalData: IAdditionalData[] = [
            {
                title: 'Roles',
                data: <Typography>{props.user?.roleNames.join(', ')}</Typography>
            }
        ]

        return additionalData
    }

    const getSections = (user: User) => {
        //TODO add community/guiding/team sections
        return [
            {
                link: 'Profile',
                children: <ViewUserData user={user} />
            }
        ]
    }

    const getFloatingButtons = useCallback(() => {
        const buttons: IFloatingIconButton[] = []

        if (!props.profile) {
            buttons.push({
                width: 'auto',
                onClick: () => {
                    setEditUser(true)
                },
                children: <Typography color={Colors.textOnPrimary}>Edit User</Typography>
            })
        }

        return buttons
    }, [props.profile])

    return (
        <>
            <SidebarPage>
                <Container width="100%" padding="0">
                    {!props.user ? (
                        <QuadSpinner />
                    ) : (
                        <SideMenu
                            titleWidth="35%"
                            additionalData={getAdditionalData()}
                            checkActive={checkActive}
                            navFunc={navFunc}
                            title={props.user.displayName}
                            description={`ID: ${props.user._id}`}
                            sections={getSections(props.user)}
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
            <UserOverlay
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditUser}
                data={props.user}
            />
        </>
    )
}
