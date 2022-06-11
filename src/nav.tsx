import { INavType } from '@sector-eleven-ltd/se-react-toolkit'
import { BiUserCircle } from 'react-icons/bi'
import { CgUser, CgCommunity, CgList } from 'react-icons/cg'
import { AiOutlineTeam } from 'react-icons/ai'
import React from 'react'

export enum UserTypes {
    admin = 'administrator',
    member = 'member'
}

export const sidebarNav: INavType[] = [
    {
        title: 'Profile',
        link: '/profile',
        icon: <CgUser size={20} />
    },
    {
        title: 'User Management',
        permission: [UserTypes.admin]
    },
    {
        title: 'Users',
        link: '/users',
        icon: <CgList size={20} />,
        permission: [UserTypes.admin]
    },
    {
        title: 'Community Management'
    },
    {
        title: 'Communities',
        link: '/communities',
        icon: <CgCommunity size={20} />,
        permission: [UserTypes.admin]
    },
    {
        title: 'My Communities',
        link: '/myCommunities',
        icon: <CgCommunity size={20} />
    },
    {
        title: 'Team Management'
    },
    {
        title: 'Teams',
        link: '/teams',
        icon: <AiOutlineTeam size={20} />,
        permission: [UserTypes.admin]
    },
    {
        title: 'My Teams',
        link: '/myTeams',
        icon: <AiOutlineTeam size={20} />
    },
    {
        title: 'System',
        permission: UserTypes.admin
    },
    {
        title: 'Administrators',
        link: '/administrators',
        icon: <BiUserCircle size={20} />,
        permission: UserTypes.admin
    }
]
