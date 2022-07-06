import { mockTeam, mockTeamList } from '../mock'
import { axios11 } from './config'

export interface ITeam extends ICreateTeam {
    id: string
}

export interface ICreateTeam {
    name: string
}

export const getTeams = async () => {
    // const result = await axios11.get<{ data: ITeam[] }>(`/teams`)
    // return result.data.data

    //TODO remove
    return mockTeamList
}

export const getUserTeams = async (userId: string) => {
    // const result = await axios11.get<{ data: ITeam[] }>(`/teams/member/${userId}`)
    // return result.data.data

    //TODO remove
    console.log(userId)
    return mockTeamList
}

export const getTeam = async (id: string) => {
    // const result = await axios11.get<{ data: ITeam }>(`/teams/${id}`)
    // return result.data.data

    //TODO remove
    console.log(id)
    return mockTeam
}

export const createTeam = async (createTeam: ICreateTeam) => {
    const result = await axios11.post<{ data: ITeam }>(`/teams`, createTeam)

    return result.data.data
}

export const updateTeam = async (id: string, updateTeam: Partial<ICreateTeam>) => {
    const result = await axios11.post<{ data: ITeam }>(`/teams/${id}`, updateTeam)

    return result.data.data
}

export const assignUserToTeam = async (userId: string, teamId: string) => {
    const result = await axios11.post<{ data: ITeam }>(` /assign/${userId}/team/${teamId}`)

    return result.data.data
}

export const unassignUserFromTeam = async (userId: string, teamId: string) => {
    const result = await axios11.post<{ data: ITeam }>(` /unassign/${userId}/team/${teamId}`)

    return result.data.data
}
