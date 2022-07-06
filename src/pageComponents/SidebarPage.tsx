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
import { ReactNode, useCallback, useContext, useMemo } from 'react'
import { AiOutlineUser, AiOutlineLogout, AiOutlineHome } from 'react-icons/ai'
import { sidebarNavBuilder, UserTypes } from '../nav'
import Image from 'next/image'
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
        router.push('/logout')
    }

    const handleCommunityClick = () => {
        router.push('/my-community')
    }

    const handleGuideCommunityClick = () => {
        router.push('/guide-community')
    }

    const handleTeamClinic = () => {
        router.push('/my-teams')
    }

    const getName = useCallback(() => {
        if (auth.user) {
            return auth.user.name
        }
    }, [auth.user])

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
                onClick: handleTeamClinic
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

    const nav = useMemo(() => sidebarNavBuilder(auth.user), [auth.user])

    return (
        <Sidebar
            nav={nav}
            permissionCheck={permissionCheck}
            logo={
                <Container width="80%">
                    <Image src={logo} alt="Logo" />
                </Container>
            }
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
