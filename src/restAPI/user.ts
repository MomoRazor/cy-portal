import { IDataContextInput } from '@sector-eleven-ltd/se-react-toolkit'
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
    communityGuideOf?: Community[]
    communityMemberOf?: Community[]
    teamMemberOf?: Team[]
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
export const getUserTable = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: User[] }>(`/cam-youths/get/users/table`, filter)
    return result.data.data
}

//TODO Change Argument
export const getUserAutocomplete = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: User[] }>(
        `/cam-youths/get/users/autocomplete`,
        filter
    )
    return result.data.data
}

export const createUser = async (user: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/auth/create/users`, user)

    return result.data
}

export const updateUser = async (id: string, updateUser: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/auth/update/users`, {
        id,
        ...updateUser
    })

    return result.data
}
