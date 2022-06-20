import { PanelFormSection, TextField } from '@sector-eleven-ltd/se-react-toolkit'
import { ChangeEvent } from 'react'

export interface ITeamFormSection {
    name: string
    setName: (data: string) => void
    errorName: string
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
    </PanelFormSection>
)
