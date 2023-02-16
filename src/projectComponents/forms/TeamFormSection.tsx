import { IOption, PanelFormSection, TextField } from '@sector-eleven-ltd/se-react-toolkit'
import { ChangeEvent } from 'react'
import { RoleAutocomplete } from '../autocompletes'

export interface ITeamFormSection {
    name: string
    setName: (data: string) => void
    errorName: string
    groupEmail: string
    setGroupEmail: (data: string) => void
    errorGroupEmail: string
    roleNames: IOption | IOption[] | null
    setRoleNames: (roles: IOption[] | IOption | null) => void
}

export const TeamFormSection = (props: ITeamFormSection) => (
    <PanelFormSection title="Team Information">
        <TextField
            value={props.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setName(e.target.value)}
            width="100%"
            label="Name"
            error={props.errorName}
        />
        <TextField
            value={props.groupEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setGroupEmail(e.target.value)}
            width="100%"
            label="Group Email"
            error={props.errorGroupEmail}
        />
        <RoleAutocomplete roles={props.roleNames} setRoles={props.setRoleNames} />
    </PanelFormSection>
)
