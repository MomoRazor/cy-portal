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

export const getUserTable = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: User[] }>(`/cam-youths/get/users/table`, filter)
    return result.data.data
}

export const getUserAutocomplete = async (fullData: IDataContextInput) => {
    const { filter, limit, page, sort } = fullData

    const { search, ...restOfFilter } = filter

    const result = await axios11.post<{ data: User }>(`/cam-youths/get/users/autocomplete`, {
        filter: restOfFilter,
        limit,
        page,
        sort,
        search
    })
    return result.data.data
}

export const createUser = async (user: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/auth/create/users`, {
        ...user,
        roleNames: ['Member']
    })

    return result.data
}

export const updateUser = async (id: string, updateUser: Partial<User>) => {
    const result = await axios11.post<{ data: User }>(`/auth/update/users`, {
        id,
        ...updateUser
    })

    return result.data
}
