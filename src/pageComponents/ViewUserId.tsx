import {
    Colors,
    Container,
    FloatingIconButton,
    FloatingPosH,
    IAdditionalData,
    ISideMenuSection,
    PillContainer,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { IUser } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import { UserOverlay, ViewUserData } from '../projectComponents'

export interface IViewUserId {
    user?: IUser
    setUser: (data: IUser) => void
}

export const ViewUserId = (props: IViewUserId) => {
    const router = useRouter()
    const [showEditUser, setEditUser] = useState(false)

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
                            subtitle="Administrator"
                            description={`ID: ${props.user.id}`}
                            sections={getSections(props.user)}
                        />
                    )}
                </Container>
            </SidebarPage>
            <FloatingIconButton
                horizontalPos={FloatingPosH.right}
                width="auto"
                right="40px"
                bottom="30px"
                onClick={() => {
                    setEditUser(true)
                }}
                zIndex={5}
            >
                <Typography color={Colors.textOnPrimary}>Edit User</Typography>
            </FloatingIconButton>
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
