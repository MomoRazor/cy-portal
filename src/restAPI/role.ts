import { axios11 } from './config'

export interface Role {
    _id: string
    name: string
}

//TODO Change Argument
export const getRoleAutocomplete = async (id: string) => {
    const result = await axios11.post<{ data: Role }>(`/auth/get/roles/autocomplete`, { id })
    return result.data
}
