import {
    Alignment,
    AuthContext,
    Colors,
    Container,
    Direction,
    FullScreenButton,
    INavSection,
    ProfileBox,
    Sidebar,
    Spacer,
    ThemeToggle,
    Topbar
} from '@sector-eleven-ltd/se-react-toolkit'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useContext } from 'react'
import { AiOutlineUser, AiOutlineLogout, AiOutlineHome } from 'react-icons/ai'
import Image from 'next/image'
import logo from '../../public/logo_color_600px-no-bg.png'
import { checkPages, sidebarNav } from '../nav'
import { FirestoreContext } from '../projectComponents'

export interface ISidebarPage {
    children?: ReactNode
}

export const SidebarPage = (props: ISidebarPage) => {
    const auth = useContext(AuthContext)
    const { pages } = useContext(FirestoreContext)

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
            return auth.user.displayName
        }
    }, [auth.user])

    const getRoles = useCallback(() => {
        if (auth.user) {
            return auth.user.roleNames.join(', ')
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

        if (auth.user?.communitiesGuideOf) {
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

    const getAccess = useCallback(
        (sections: INavSection) => {
            if (sections && pages) {
                return checkPages(pages, window.location.origin, sections.link || '')
            } else {
                return false
            }
        },
        [pages]
    )

    return (
        <Sidebar
            nav={sidebarNav}
            permissionCheck={getAccess}
            logo={<Image src={logo} alt="Logo" width="120" />}
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
                        <ProfileBox name={getName()} options={getOptions()} subText={getRoles()} />
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
