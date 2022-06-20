import {
    Alignment,
    AuthContext,
    Colors,
    Container,
    Direction,
    FullScreenButton,
    ProfileBox,
    Sidebar,
    Spacer,
    ThemeToggle,
    Topbar
} from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext } from 'react'
import { AiOutlineUser, AiOutlineLogout, AiOutlineHome } from 'react-icons/ai'
import { sidebarNav, UserTypes } from '../nav'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import logo from '../../public/logo_color_600px-no-bg.png'

export interface ISidebarPage {
    children?: ReactNode
}

export const SidebarPage = (props: ISidebarPage) => {
    const auth = useContext(AuthContext)

    const router = useRouter()

    const handleViewClick = () => {
        router.push('/profile')
    }

    const handleLogOutClick = async () => {
        const firebaseAuth = getAuth()
        if (auth) {
            try {
                await firebaseAuth.signOut()
                auth.logout && auth.logout()
                router.push('/')
            } catch (e) {
                console.error(e)
            }
        }
    }

    const handleCommunityClick = () => {
        router.push('/myCommunity')
    }

    const handleGuideCommunityClick = () => {
        router.push('/guideCommunity')
    }

    const getName = () => {
        if (auth.user) {
            return auth.user.name
        }
    }

    const getOptions = () => {
        let options = []

        if (auth.user?.communityMemberOf) {
            options.push({
                name: 'View My Community',
                icon: <AiOutlineHome />,
                onClick: handleCommunityClick
            })
        }

        if (auth.user?.communityGuideOf) {
            options.push({
                name: 'View Guiding Community',
                icon: <AiOutlineHome />,
                onClick: handleGuideCommunityClick
            })
        }

        if (auth.user?.teamMemberOf) {
            options.push({
                name: 'View My Teams',
                icon: <AiOutlineHome />,
                onClick: handleGuideCommunityClick
            })
        }

        options = options.concat([
            {
                name: 'View Profile',
                icon: <AiOutlineUser />,
                onClick: handleViewClick
            },
            {
                name: 'Logout',
                icon: <AiOutlineLogout />,
                onClick: handleLogOutClick
            }
        ])

        return options
    }

    const permissionCheck = (permissionRequired: UserTypes[]) => {
        if (permissionRequired.includes(UserTypes.admin)) {
            if (auth.user?.isAdmin) {
                return true
            } else {
                return false
            }
        }
        return true
    }

    return (
        <Sidebar
            nav={sidebarNav}
            permissionCheck={permissionCheck}
            logo={
                <Container width="80%">
                    <Image src={logo} alt="Logo" />
                </Container>
            }
            // favicon={
            //     <>
            //         <Spacer />
            //         <Image src={iconLogo} alt="Logo" />
            //     </>
            // }
            // footer={
            //     <Container padding="20px 0" width="100%" crossAxis={Alignment.center}>
            //         <Container padding="0" width="75%">
            //             <Image src={imgFooter1} alt="Footer img 1" />
            //             <Spacer />
            //             <Image src={imgFooter2} alt="Footer img 2" />
            //         </Container>
            //     </Container>
            // }
        >
            <Topbar
                showBreadCrumb
                rightChildren={
                    <Container direction={Direction.row} crossAxis={Alignment.center} padding="0">
                        <ThemeToggle
                            toggleFunction={(setTheme, currentTheme) => {
                                if (currentTheme === 0) {
                                    setTheme(1)
                                } else {
                                    setTheme(0)
                                }
                            }}
                        />
                        <Spacer width="10px" />
                        <FullScreenButton />
                        <Spacer width="15px" />
                        <ProfileBox name={getName()} options={getOptions()} />
                    </Container>
                }
            >
                <Container width="100%" padding="0" backgroundColor={Colors.backgroundDarker}>
                    {props.children}
                </Container>
            </Topbar>
        </Sidebar>
    )
}
