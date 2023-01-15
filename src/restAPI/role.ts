import { IDataContextInput } from '@sector-eleven-ltd/se-react-toolkit'
import { axios11 } from './config'

export interface Role {
    _id: string
    name: string
}

//TODO Change Argument
export const getRoleAutocomplete = async (filter: IDataContextInput) => {
    const result = await axios11.post<{ data: Role }>(`/auth/get/roles/autocomplete`, filter)
    return result.data
}
