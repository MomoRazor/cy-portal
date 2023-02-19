import { IDataContextInput } from '@sector-eleven-ltd/se-react-toolkit'
import { axios11 } from './config'

export interface Community {
    _id: string
    name: string
    groupEmail: string
    memberIds: string[]
    guideIds: string[]
}

export const getCommunity = async (id: string) => {
    const result = await axios11.post<{ data: Community[] }>(`/cam-youths/get/communities`, { id })
    return result.data
}

export const getCommunityTable = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/get/communities/table`,
        filter
    )
    return result.data.data
}

export const getCommunityAutocomplete = async (fullData: IDataContextInput) => {
    const { filter, limit, page, sort } = fullData

    const { search, ...restOfFilter } = filter

    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/get/communities/autocomplete`,
        {
            filter: restOfFilter,
            limit,
            page,
            sort,
            search
        }
    )
    return result.data.data
}

export const createCommunity = async (community: Partial<Community>) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/create/communities`,
        community
    )

    return result.data.data
}

export const updateCommunity = async (id: string, community: Partial<Community>) => {
    const result = await axios11.post<{ data: Community }>(`/cam-youths/update/communities`, {
        id,
        ...community
    })

    return result.data.data
}

export const assignUserToCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/assign/member/${userId}/community/${communityId}`
    )

    return result.data
}

export const unassignUserFromCommunityAsMember = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/unassign/member/${userId}/community/${communityId}`
    )

    return result.data
}

export const assignUserToCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/assign/guide/${userId}/community/${communityId}`
    )

    return result.data
}

export const unassignUserFromCommunityAsGuide = async (userId: string, communityId: string) => {
    const result = await axios11.post<{ data: Community }>(
        `/cam-youths/unassign/guide/${userId}/community/${communityId}`
    )

    return result.data
}
