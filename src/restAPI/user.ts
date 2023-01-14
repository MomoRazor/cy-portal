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

export const loginUser = async () => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/login`)

    return result.data
}

export const getUser = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/get/users`, { id })
    return result.data
}

//TODO Change Argument
export const getUserTable = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/get/users/table`, { id })
    return result.data
}

//TODO Change Argument
export const getUserAutocomplete = async (id: string) => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/get/users/autocomplete`, { id })
    return result.data
}

export const createUser = async (user: User) => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/create/users`, user)

    return result.data
}

export const updateUser = async (id: string, updateUser: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/cam-youths/update/users`, {
        id,
        ...updateUser
    })

    return result.data
}
