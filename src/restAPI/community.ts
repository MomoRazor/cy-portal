import { mockCommunity, mockCommunityList } from '../mock'
import { axios11 } from './config'

export interface ICommunity extends ICreateCommunity {
    id: string
}

export interface ICreateCommunity {
    name: string
}

export const getCommunities = async () => {
    // const result = await axios11.get<{ data: ICommunity[] }>(`/communities`)
    // return result.data.data

    //TODO remove
    return mockCommunityList
}

export const getGuideCommunities = async (userId: string) => {
    // const result = await axios11.get<{ data: ICommunity[] }>(`/communities/guide/${userId}`)
    // return result.data.data

    //TODO remove
    console.log(userId)
    return mockCommunityList
}

export const getCommunity = async (id: string) => {
    // const result = await axios11.get<{ data: ICommunity }>(`/communities/${id}`)
    // return result.data.data

    //TODO remove
    console.log(id)
    return mockCommunity
}

export const createCommunity = async (createCommunity: ICreateCommunity) => {
    const result = await axios11.post<{ data: ICommunity }>(`/communities`, createCommunity)

    return result.data.data
}

export const updateCommunity = async (id: string, updateCommunity: Partial<ICreateCommunity>) => {
    const result = await axios11.post<{ data: ICommunity }>(`/communities/${id}`, updateCommunity)

    return result.data.data
}

export const assignUserToCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /assign/${userId}/community/${communityId}/member`
    )

    return result.data.data
}

export const unassignUserFromCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /unassign/${userId}/community/${communityId}/member`
    )

    return result.data.data
}

export const assignUserToCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /assign/${userId}/community/${communityId}/guide`
    )

    return result.data.data
}

export const unassignUserFromCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: ICommunity }>(
        ` /unassign/${userId}/community/${communityId}/guide`
    )

    return result.data.data
}
