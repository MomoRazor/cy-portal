import { CgUser, CgCommunity, CgList } from 'react-icons/cg'
import { AiOutlineTeam } from 'react-icons/ai'
import { INavType } from '@sector-eleven-ltd/se-react-toolkit'

export interface IPagePermission {
    [name: string]: string[]
}

export const checkPages = (userPages: string[], domain: string, endpoint: string) => {
    const cleanedEndpoint = endpoint.split('?')[0]
    if (userPages.includes(`*:*`) || userPages.includes(`${domain}:*`)) {
        return true
    } else {
        for (let i = 0; i < userPages.length; i++) {
            if (userPages[i] === `${domain}:${cleanedEndpoint}`) {
                return true
            } else {
                const splitPageA = userPages[i].split('/').filter((page) => page)
                const splitPageB = `${domain}:${cleanedEndpoint}`.split('/').filter((page) => page)

                const max =
                    splitPageA.length > splitPageB.length ? splitPageA.length : splitPageB.length

                let failed = false
                for (let j = 0; j < max; j++) {
                    if (splitPageA[j] === '*') {
                        return true
                    } else if (
                        !splitPageA[j] ||
                        (splitPageA[j][0] !== ':' && splitPageA[j] !== splitPageB[j])
                    ) {
                        failed = true
                        break
                    }
                }

                if (!failed) {
                    return true
                }
            }
        }
    }

    return false
}

export const sidebarNav: INavType[] = [
    {
        title: 'My Information',
        sections: [
            {
                title: 'Profile',
                link: '/profile',
                icon: <CgUser size={20} />
            },
            {
                title: 'My Community',
                link: '/my-communities',
                icon: <CgCommunity size={20} />
            },
            {
                title: 'Guiding Communities',
                link: '/guide-communities',
                icon: <CgCommunity size={20} />
            },
            {
                title: 'My Teams',
                link: '/my-teams',
                icon: <AiOutlineTeam size={20} />
            }
        ]
    },
    {
        title: 'Event Management',
        sections: [
            {
                title: 'Calendar',
                link: '/calendar',
                icon: <CgList size={20} />
            },
            {
                title: 'Events',
                link: '/events',
                icon: <CgList size={20} />
            }
        ]
    },
    {
        title: 'User Management',
        sections: [
            {
                title: 'Users',
                link: '/users',
                icon: <CgList size={20} />
            }
        ]
    },
    {
        title: 'Group Management',
        sections: [
            {
                title: 'Communities',
                link: '/communities',
                icon: <CgCommunity size={20} />
            },
            {
                title: 'Teams',
                link: '/teams',
                icon: <AiOutlineTeam size={20} />
            }
        ]
    }
]
