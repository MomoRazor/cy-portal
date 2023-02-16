import { IDataContextInput } from '@sector-eleven-ltd/se-react-toolkit'
import { axios11 } from './config'

export interface Role {
    _id: string
    name: string
}

export const getRoleAutocomplete = async (fullData: IDataContextInput) => {
    const { filter, limit, page, sort } = fullData

    const { search, ...restOfFilter } = filter

    const result = await axios11.post<{ data: Role }>(`/auth/get/roles/autocomplete`, {
        filter: restOfFilter,
        limit,
        page,
        sort,
        search
    })
    return result.data
}
