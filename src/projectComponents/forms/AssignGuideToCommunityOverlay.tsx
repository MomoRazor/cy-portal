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
import { assignUserToCommunityAsGuide, getUserAutocomplete, Community } from '../../restAPI'
import { parseUserOptions } from '../../utils'

export interface IAssignGuideToCommunityOverlay {
    show: boolean
    onClose: EmptyFunctionHandler
    community?: Community
    onSave: () => void
}

export const AssignGuideToCommunityOverlay = (props: IAssignGuideToCommunityOverlay) => {
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
                    await assignUserToCommunityAsGuide(user.id || '', props.community?._id || '')

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

    const apiCall = async () => {
        return await getUserAutocomplete({
            filter: {
                $and: [
                    {
                        _id: {
                            $nin: props.community?.memberIds
                        }
                    },
                    {
                        _id: {
                            $nin: props.community?.guideIds
                        }
                    }
                ]
            }
        })
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
                        title: 'Assign a User as Guide',
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
                                apiCall={apiCall}
                                onChange={setUser}
                                value={user || undefined}
                                parseOptions={parseUserOptions}
                                emptyFilterString
                                parseFilter={(query) => {
                                    return {
                                        search: query
                                    }
                                }}
                                error={errorUser}
                            />
                        </Container>
                    </PanelFormSection>
                </PanelForm>
            </Overlay>
        </>
    )
}
