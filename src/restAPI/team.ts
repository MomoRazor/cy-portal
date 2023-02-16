import { IDataContextInput } from '@sector-eleven-ltd/se-react-toolkit'
import { axios11 } from './config'

export interface Team {
    _id: string
    name: string
    groupEmail: string
    roleNames: string[]
    memberIds: string[]
}

export const getTeam = async (id: string) => {
    const result = await axios11.post<{ data: Team[] }>(`/cam-youths/get/teams`, { id })
    return result.data
}

export const getTeamTable = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: Team }>(`/cam-youths/get/teams/table`, filter)
    return result.data.data
}

export const getTeamAutocomplete = async (fullData: IDataContextInput) => {
    const { filter, limit, page, sort } = fullData

    const { search, ...restOfFilter } = filter

    const result = await axios11.post<{ data: Team }>(`/cam-youths/get/teams/autocomplete`, {
        filter: restOfFilter,
        limit,
        page,
        sort,
        search
    })
    return result.data.data
}

export const createTeam = async (team: Partial<Team>) => {
    const result = await axios11.post<{ data: Team }>(`/cam-youths/create/teams`, team)

    return result.data
}

export const updateTeam = async (id: string, team: Partial<Team>) => {
    const result = await axios11.post<{ data: Team }>(`/cam-youths/update/teams`, {
        id,
        ...team
    })

    return result.data
}

export const assignUserToTeam = async (userId: string, teamId: string) => {
    const result = await axios11.post<{ data: Team }>(
        `/cam-youths/assign/member/${userId}/team/${teamId}`
    )

    return result.data
}

export const unassignUserFromTeam = async (userId: string, teamId: string) => {
    const result = await axios11.post<{ data: Team }>(
        `/cam-youths/unassign/member/${userId}/team/${teamId}`
    )

    return result.data
}
