import { Autocomplete, IOption } from '@sector-eleven-ltd/se-react-toolkit'
import { Role, getRoleAutocomplete } from '../../restAPI'

interface IRoleAutocomplete {
    errorRole?: string
    roles: IOption[] | IOption | null
    setRoles: (roles: IOption[] | IOption | null) => void
}

export const RoleAutocomplete = ({ roles, setRoles, ...props }: IRoleAutocomplete) => {
    const parseRoleData = (roleData: any, func?: Function) => {
        if (roleData.data.data) {
            if (func) {
                return func(roleData.data.data)
            } else {
                return rolesToOption(roleData.data.data)
            }
        } else {
            return []
        }
    }

    const rolesToOption = (roles?: Role[]) => {
        return (
            roles?.map((role) => ({
                id: role.name,
                display: role.name
            })) || []
        )
    }

    return (
        <Autocomplete
            label="Roles"
            multiple
            apiCall={getRoleAutocomplete}
            onChange={setRoles}
            value={roles || []}
            parseFilter={(query) => {
                return {
                    search: query
                }
            }}
            parseOptions={parseRoleData}
            error={props.errorRole}
        />
    )
}
