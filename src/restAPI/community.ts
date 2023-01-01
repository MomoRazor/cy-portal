import { axios11 } from './config'

export interface Community {
    _id: string
    name: string
    memberIds: string[]
}

export const getCommunity = async (id: string) => {
    const result = await axios11.post<{ data: Community[] }>(`/core/get/communities`, { id })
    return result.data
}

//TODO Change Argument
export const getCommunityTable = async (id: string) => {
    const result = await axios11.post<{ data: Community }>(`/core/get/communities/table`, { id })
    return result.data
}

//TODO Change Argument
export const getCommunityAutocomplete = async (id: string) => {
    const result = await axios11.post<{ data: Community }>(`/core/get/communities/autocomplete`, {
        id
    })
    return result.data
}

export const createCommunity = async (community: Community) => {
    const result = await axios11.post<{ data: Community }>(`/core/create/communities`, community)

    return result.data
}

export const updateCommunity = async (id: string, community: Partial<Community>) => {
    const result = await axios11.post<{ data: Community }>(`/core/update/communities`, {
        id,
        ...community
    })

    return result.data
}

export const assignUserToCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/core/assign/member/${userId}/community/${communityId}`
    )

    return result.data
}

export const unassignUserFromCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/core/unassign/member/${userId}/community/${communityId}`
    )

    return result.data
}

export const assignUserToCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/core/assign/guide/${userId}/community/${communityId}`
    )

    return result.data
}

export const unassignUserFromCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/core/unassign/guide/${userId}/community/${communityId}`
    )

    return result.data
}
