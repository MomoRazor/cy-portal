import { PanelFormSection, TextField } from '@sector-eleven-ltd/se-react-toolkit'
import { ChangeEvent } from 'react'

export interface IUserFormSection {
    name: string
    setName: (data: string) => void
    errorName: string
    surname: string
    setSurname: (data: string) => void
    errorSurname: string
    email: string
    setEmail: (data: string) => void
    errorEmail: string
}

export const UserFormSection = (props: IUserFormSection) => (
    <PanelFormSection title={'User Basic information'}>
        <TextField
            value={props.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setName(e.target.value)}
            width="100%"
            label="Name"
            error={props.errorName}
        />
        <TextField
            value={props.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setSurname(e.target.value)}
            width="100%"
            label="Surname"
            error={props.errorSurname}
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
