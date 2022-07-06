import { ICommunity, ITeam, IUser } from './restAPI'

export const mockUser: IUser = {
    id: 'test',
    isAdmin: true,
    communityMemberOfId: 'morcyon',
    communityMemberOf: {
        id: 'morcyon',
        name: 'Morcyon'
    },
    communityGuideOfId: ['takara'],
    communityGuideOf: [{ id: 'takara', name: 'Takara' }],
    teamMemberOfId: ['lc'],
    teamMemberOf: [
        {
            id: 'lc',
            name: 'LC'
        }
    ],
    name: 'Maurovic',
    surname: 'Cachia',
    email: 'maurovic.cachia@gmail.com'
}

export const mockUserList: IUser[] = [
    mockUser,
    {
        id: 'test1',
        isAdmin: true,
        communityMemberOfId: 'morcyon',
        communityMemberOf: {
            id: 'morcyon',
            name: 'Morcyon'
        },
        teamMemberOfId: ['lc'],
        teamMemberOf: [
            {
                id: 'lc',
                name: 'LC'
            }
        ],
        name: 'Nicholas',
        surname: 'Massa',
        email: 'nicholas.massa@gmail.com'
    },
    {
        id: 'test3',
        isAdmin: false,
        communityMemberOfId: 'onyx',
        communityMemberOf: {
            id: 'onyx',
            name: 'Onyx'
        },
        name: 'John',
        surname: 'Doe',
        email: 'John.Doe@gmail.com'
    }
]

export const mockTeam: ITeam = {
    id: 'lc',
    name: 'LC'
}

export const mockTeamList: ITeam[] = [
    mockTeam,
    {
        id: 'st',
        name: 'ST'
    },
    {
        id: 'finance',
        name: 'Finance'
    }
]

export const mockCommunity: ICommunity = {
    id: 'morcyon',
    name: 'Morycon'
}

export const mockCommunityList: ICommunity[] = [
    mockCommunity,
    {
        id: 'takara',
        name: 'Takara'
    },
    {
        id: 'onyx',
        name: 'Onyx'
    }
]
