import {
    Alignment,
    Autocomplete,
    Colors,
    Container,
    Direction,
    displaySnackbar,
    EmptyFunctionHandler,
    IOption,
    Overlay,
    OverlayDirection,
    PanelForm,
    PanelFormSection,
    Settings,
    SnackbarContext,
    SnackbarType,
    Spacer,
    Typography
} from '@sector-eleven-ltd/se-react-toolkit'
import { useContext, useState } from 'react'
import { assignUserToCommunityAsMember, Community, getUserAutocomplete } from '../../restAPI'
import { parseUserOptions } from '../../utils'

export interface IAssignUserToCommunityOverlay {
    show: boolean
    onClose: EmptyFunctionHandler
    community?: Community
    onSave: () => void
}

export const AssignUserToCommunityOverlay = (props: IAssignUserToCommunityOverlay) => {
    const { addData } = useContext(SnackbarContext)
    const [load, setLoad] = useState(false)

    const [user, setUser] = useState<IOption | IOption[] | null>()
    const [errorUser, setErrorUser] = useState('')

    const closeOverlay = () => {
        setUser(null)
        props.onClose && props.onClose()
    }

    const handleAssignSave = async () => {
        if (!user) {
            setErrorUser('This is required')
        } else {
            setErrorUser('')

            try {
                if (!Array.isArray(user)) {
                    setLoad(true)
                    await assignUserToCommunityAsMember(user.id || '', props.community?._id || '')

                    props.onSave && props.onSave()
                    displaySnackbar('User Assigned', SnackbarType.success, addData)
                    setUser(null)
                    setLoad(false)
                }
            } catch (e) {
                displaySnackbar('Failed to Assign User', SnackbarType.error, addData)
            }
        }
    }

    return (
        <>
            <Overlay
                covered
                show={props.show}
                direction={OverlayDirection.right}
                shadow={Colors.shadow}
                shadowDim={Settings.shadowDimensions}
                openSize="500px"
                onClose={closeOverlay}
            >
                <PanelForm
                    titleSection={{
                        title: 'Assign a User as Member',
                        close: closeOverlay
                    }}
                    saveSection={{
                        buttonText: 'Assign',
                        discardOnClick: closeOverlay,
                        primaryOnClick: handleAssignSave,
                        primaryButtonLoading: load
                    }}
                >
                    <PanelFormSection title="Select a User">
                        <Typography>Assigning to {props.community?.name}</Typography>
                        <Spacer />
                        <Container
                            padding="0"
                            direction={Direction.row}
                            crossAxis={Alignment.center}
                        >
                            <Autocomplete
                                width="100%"
                                label="Users"
                                apiCall={getUserAutocomplete}
                                onChange={setUser}
                                value={user || undefined}
                                parseOptions={parseUserOptions}
                                emptyFilterString
                                parseFilter={() => {}}
                                error={errorUser}
                            />
                        </Container>
                    </PanelFormSection>
                </PanelForm>
            </Overlay>
        </>
    )
}
