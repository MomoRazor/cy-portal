import { axios11 } from './config'

export interface ICommunity extends ICreateCommunity {
    id: string
}

export interface ICreateCommunity {
    name: string
}

export const getCommunities = async () => {
    const result = await axios11.get<{ data: ICommunity[] }>(`/communities`)

    return result.data.data
}

export const getCommunity = async (id: string) => {
    const result = await axios11.get<{ data: ICommunity }>(`/communities/${id}`)

    return result.data.data
}

export const createCommunity = async (createCommunity: ICreateCommunity) => {
    const result = await axios11.post<{ data: ICommunity }>(`/communities`, createCommunity)

    return result.data.data
}

export const updateCommunity = async (id: string, updateCommunity: Partial<ICreateCommunity>) => {
    const result = await axios11.post<{ data: ICommunity }>(`/communities/${id}`, updateCommunity)

    return result.data.data
}

export const assignUserToCommunity = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /assign/${userId}/community/${communityId}`
    )

    return result.data.data
}

export const unassignUserFromCommunity = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /unassign/${userId}/community/${communityId}`
    )

    return result.data.data
}
