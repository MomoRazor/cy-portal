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
    PillContainer,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IUser, setUserAdmin, unsetUserAdmin } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import { UserOverlay, ViewUserData } from '../projectComponents'

export interface IViewUserId {
    user?: IUser
    setUser: (data: IUser) => void
}

export const ViewUserId = (props: IViewUserId) => {
    const router = useRouter()
    const [showEditUser, setEditUser] = useState(false)

    const [showAssignCommunity, setShowAssignCommunity] = useState(false)
    const [showGuidesCommunities, setShowGuidesCommunities] = useState(false)
    const [showAssignTeams, setShowAssignTeams] = useState(false)

    const auth = useContext(AuthContext)

    const [adminUnassignLoading, setAdminUnassignLoading] = useState(false)
    const [adminAssignLoading, setAdminAssignLoading] = useState(false)

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
            router.push(`/users/${props.user?.id}?section=` + section?.link, undefined, {
                shallow: true
            })
        }
    }

    const handleDiscard = () => {
        setEditUser(false)
    }

    const saveDrawer = (data?: IUser) => {
        if (data) {
            props.setUser(data)
        }
        setEditUser(false)
    }

    const getAdditionalData = () => {
        const additionalData: IAdditionalData[] = [
            {
                title: 'Is an Admin',
                data: (
                    <PillContainer
                        text={props.user?.isAdmin ? 'Yes' : 'No'}
                        color={props.user?.isAdmin ? Colors.success : Colors.error}
                    />
                )
            }
        ]

        return additionalData
    }

    const getSections = (user: IUser) => {
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

        if (props.user?.id === auth.user.id || auth.user.isAdmin) {
            buttons.push({
                width: 'auto',
                onClick: () => {
                    setEditUser(true)
                },
                children: <Typography color={Colors.textOnPrimary}>Edit User</Typography>
            })
        }

        if (auth.user.isAdmin) {
            if (props.user?.isAdmin) {
                buttons.push({
                    width: 'auto',
                    onClick: async () => {
                        setAdminUnassignLoading(true)
                        await unsetUserAdmin(props.user?.id || '')
                        setAdminUnassignLoading(false)
                    },
                    loading: adminUnassignLoading,
                    children: <Typography color={Colors.textOnPrimary}>Unset as Admin</Typography>
                })
            } else {
                buttons.push({
                    width: 'auto',
                    onClick: async () => {
                        setAdminAssignLoading(true)
                        await setUserAdmin(props.user?.id || '')
                        setAdminAssignLoading(false)
                    },
                    loading: adminAssignLoading,
                    children: <Typography color={Colors.textOnPrimary}>Set as Admin</Typography>
                })
            }

            buttons.push({
                width: 'auto',
                onClick: async () => {
                    setShowAssignCommunity(true)
                },
                children: <Typography color={Colors.textOnPrimary}>Community Membership</Typography>
            })

            buttons.push({
                width: 'auto',
                onClick: async () => {
                    setShowGuidesCommunities(true)
                },
                children: <Typography color={Colors.textOnPrimary}>Community Guide</Typography>
            })

            buttons.push({
                width: 'auto',
                onClick: async () => {
                    setShowAssignTeams(true)
                },
                children: <Typography color={Colors.textOnPrimary}>Team Membership</Typography>
            })
        }

        return buttons
    }, [
        adminAssignLoading,
        adminUnassignLoading,
        auth.user.id,
        auth.user.isAdmin,
        props.user?.id,
        props.user?.isAdmin
    ])

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
                            title={props.user.name + ' ' + props.user.surname}
                            subtitle={props.user.isAdmin ? 'Administrator' : ''}
                            description={`ID: ${props.user.id}`}
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
                covered
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditUser}
                data={props.user}
            />
        </>
    )
}
