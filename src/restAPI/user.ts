import { Community } from './community'
import { axios11 } from './config'
import { Team } from './team'

export interface User {
    _id: string
    uid: string
    displayName: string
    email: string
    roleNames: string[]
    phoneNumber: string
    blocked: boolean
    guidingCommunities?: Community[]
    memberCommunity?: Community
    memberTeam?: Team
}

export const loginUser = async (uid: string) => {
    const result = await axios11.post<{ data: User }>(`/core/login`, { uid })

    return result.data
}

export const getUser = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/core/get/users`, { id })
    return result.data
}

//TODO Change Argument
export const getUserTable = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/core/get/users/table`, { id })
    return result.data
}

//TODO Change Argument
export const getUserAutocomplete = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/core/get/users/autocomplete`, { id })
    return result.data
}

export const getMembersOfTeam = async (teamId: string) => {
    const result = await axios11.post<{ data: User[] }>(`/core/get/teams/members`, { teamId })
    return result.data
}

export const getMembersOfCommunity = async (communityId: string) => {
    const result = await axios11.post<{ data: User[] }>(`/core/get/communities/members`, {
        communityId
    })
    return result.data
}

export const getGuidesOfCommunity = async (communityId: string) => {
    const result = await axios11.post<{ data: User[] }>(`/core/get/communities/guides`, {
        communityId
    })
    return result.data
}

export const createUser = async (user: User) => {
    const result = await axios11.post<{ data: User }>(`/core/create/users`, user)

    return result.data
}

export const updateUser = async (id: string, updateUser: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/core/update/users`, {
        id,
        ...updateUser
    })

    return result.data
}
