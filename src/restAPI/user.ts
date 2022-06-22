import { ICommunity } from './community'
import { axios11 } from './config'
import { ITeam } from './team'

export interface IUser extends ICreateUser {
    id: string
    isAdmin: boolean
    communityMemberOfId?: string
    communityMemberOf?: ICommunity
    communityGuideOfId?: string[]
    communityGuideOf?: ICommunity[]
    teamMemberOfId?: string[]
    teamMemberOf?: ITeam[]
}

export interface ICreateUser {
    name: string
    surname: string
    email: string
}

export const getUsers = async () => {
    const result = await axios11.get<{ data: IUser[] }>(`/users`)

    return result.data.data
}

export const getUserMembersOfTeam = async (teamId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/members/team/${teamId}`)

    return result.data.data
}

export const getUserMembersOfCommunity = async (communityId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/members/community/${communityId}`)

    return result.data.data
}

export const getUserGuidesOfCommunity = async (communityId: string) => {
    const result = await axios11.get<{ data: IUser[] }>(`/users/guides/community/${communityId}`)

    return result.data.data
}

export const getUser = async (id: string) => {
    const result = await axios11.get<{ data: IUser }>(`/users/${id}`)

    return result.data.data
}

export const createUser = async (createUser: ICreateUser) => {
    const result = await axios11.post<{ data: IUser }>(`/users`, createUser)

    return result.data.data
}

export const updateUser = async (id: string, updateUser: Partial<ICreateUser>) => {
    const result = await axios11.post<{ data: IUser }>(`/users/${id}`, updateUser)

    return result.data.data
}

export const setUserAdmin = async (userId: string) => {
    const result = await axios11.post<{ data: IUser }>(` /set/${userId}/admin`)

    return result.data.data
}

export const unsetUserAdmin = async (userId: string) => {
    const result = await axios11.post<{ data: IUser }>(` /unset/${userId}/admin`)

    return result.data.data
}
