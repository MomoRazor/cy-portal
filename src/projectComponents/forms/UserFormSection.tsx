import { PanelFormSection, TextField } from '@sector-eleven-ltd/se-react-toolkit'
import { ChangeEvent } from 'react'

export interface IUserFormSection {
    displayName: string
    setDisplayName: (data: string) => void
    errorDisplayName: string
    email: string
    setEmail: (data: string) => void
    errorEmail: string
}

export const UserFormSection = (props: IUserFormSection) => (
    <PanelFormSection title="User Basic information">
        <TextField
            value={props.displayName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setDisplayName(e.target.value)}
            width="100%"
            label="Name"
            error={props.errorDisplayName}
        />
        <TextField
            value={props.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setEmail(e.target.value)}
            width="100%"
            label="Email"
            error={props.errorEmail}
        />
    </PanelFormSection>
)
