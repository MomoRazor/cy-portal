import { axios11 } from './config'

export interface Team {
    _id: string
    name: string
    memberIds: string[]
}

export const getTeam = async (id: string) => {
    const result = await axios11.post<{ data: Team[] }>(`/cam-youths/get/teams`, { id })
    return result.data
}

//TODO Change Argument
export const getTeamTable = async (id: string) => {
    const result = await axios11.post<{ data: Team }>(`/cam-youths/get/teams/table`, { id })
    return result.data
}

//TODO Change Argument
export const getTeamAutocomplete = async (id: string) => {
    const result = await axios11.post<{ data: Team }>(`/cam-youths/get/teams/autocomplete`, { id })
    return result.data
}

export const createTeam = async (team: Team) => {
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
    const result = await axios11.post<{ data: Team }>(`/cam-youths/assign/${userId}/team/${teamId}`)

    return result.data
}

export const unassignUserFromTeam = async (userId: string, teamId: string) => {
    const result = await axios11.post<{ data: Team }>(
        `/cam-youths/unassign/${userId}/team/${teamId}`
    )

    return result.data
}
