// import { mockUser, mockUserList } from '../mock'
import { ICommunity } from './community'
import { axios11 } from './config'
import { ITeam } from './team'

export interface IUser extends ICreateUser {
    _id: string
    isAdmin: boolean
    communityMemberOfId?: string
    communityMemberOf?: ICommunity
    communityGuideOfIds?: string[]
    communitiesGuideOf?: ICommunity[]
    teamMemberOfId?: string[]
    teamMemberOf?: ITeam[]
}

export interface ICreateUser {
    displayName: string
    email: string
}

export const getUsers = async () => {
    const result = await axios11.get<{ data: IUser[] }>(`/users`)
    return result.data

    //TODO remove mock data
    // return mockUserList
}

export const getUserMembersOfTeam = async (teamId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/members/team/${teamId}`)
    return result.data

    //TODO remove
    // return mockUserList
}

export const getUserMembersOfCommunity = async (communityId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/members/community/${communityId}`)
    return result.data

    //TODO remove
    // return mockUserList
}

export const getUserGuidesOfCommunity = async (communityId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/guides/community/${communityId}`)
    return result.data

    //TODO remove
    // return mockUserList
}

export const getUser = async (id: string) => {
    const result = await axios11.get<{ data: IUser }>(`/users/${id}`)

    return result.data

    //TODO remove
    // return mockUser
}

export const createUser = async (createUser: ICreateUser) => {
    const result = await axios11.post<{ data: IUser }>(`/users`, createUser)

    return result.data
}

export const updateUser = async (id: string, updateUser: Partial<ICreateUser>) => {
    const result = await axios11.post<{ data: IUser }>(`/users/${id}`, updateUser)

    return result.data
}

export const setUserAdmin = async (userId: string) => {
    const result = await axios11.post<{ data: IUser }>(`/set/${userId}/admin`)

    return result.data
}

export const unsetUserAdmin = async (userId: string) => {
    const result = await axios11.post<{ data: IUser }>(`/unset/${userId}/admin`)

    return result.data
}
