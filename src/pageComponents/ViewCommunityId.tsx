import {
    Colors,
    Container,
    FloatingIconButton,
    FloatingPosH,
    ISideMenuSection,
    QuadSpinner,
    SideMenu,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ICommunity } from '../restAPI'
import { SidebarPage } from './SidebarPage'
import { CommunityOverlay, ViewCommunityData } from '../projectComponents'

export interface IViewCommunityId {
    community?: ICommunity
    setCommunity: (data: ICommunity) => void
}

export const ViewCommunityId = (props: IViewCommunityId) => {
    const router = useRouter()
    const [showEditCommunity, setEditCommunity] = useState(false)

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

    const getSections = (community: ICommunity) => {
        return [
            {
                link: 'View',
                children: <ViewCommunityData community={community} />
            },
            {
                link: 'Guides',
                children: <ViewCommunityGuides community={community} />
            },
            {
                link: 'Members',
                children: <ViewCommunityMembers community={community} />
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
            <CommunityOverlay
                covered
                onClose={handleDiscard}
                onSave={saveDrawer}
                show={showEditCommunity}
                data={props.community}
            />
        </>
    )
}
