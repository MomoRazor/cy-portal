import { PanelFormSection, TextField } from '@sector-eleven-ltd/se-react-toolkit'
import { ChangeEvent } from 'react'

export interface ICommunityFormSection {
    name: string
    setName: (data: string) => void
    errorName: string
    groupEmail: string
    setGroupEmail: (data: string) => void
    errorGroupEmail: string
}

export const CommunityFormSection = (props: ICommunityFormSection) => (
    <PanelFormSection title="Community Information">
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
    </PanelFormSection>
)
