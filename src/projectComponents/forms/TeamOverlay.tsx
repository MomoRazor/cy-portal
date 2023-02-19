import {
    Colors,
    ConfirmPopup,
    displaySnackbar,
    EmptyFunctionHandler,
    IOption,
    Overlay,
    OverlayDirection,
    PanelForm,
    Settings,
    SnackbarContext,
    SnackbarType,
    useEnterSubmit
} from '@sector-eleven-ltd/se-react-toolkit'
import { useContext, useEffect, useState } from 'react'
import { createTeam, Team, updateTeam } from '../../restAPI'
import { TeamFormSection } from './TeamFormSection'

export interface ITeamOverlay {
    show: boolean
    data?: Team
    onClose: EmptyFunctionHandler
    onSave: (newData?: Team) => void
}

export const TeamOverlay = (props: ITeamOverlay) => {
    const { addData } = useContext(SnackbarContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const [createButtonLoad, setCreateButtonLoad] = useState(false)

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [groupEmail, setGroupEmail] = useState('')
    const [errorGroupEmail, setErrorGroupEmail] = useState('')
    const [roleNames, setRoleNames] = useState<IOption[] | IOption | null>(null)

    useEffect(() => {
        setErrorName('')
        setErrorGroupEmail('')

        setName(props.data?.name || '')
        setGroupEmail(props.data?.groupEmail || '')
        setRoleNames(
            props.data?.roleNames
                ? Array.isArray(props.data?.roleNames)
                    ? props.data?.roleNames.map((name) => ({
                          id: name,
                          display: name
                      }))
                    : []
                : []
        )
    }, [props.data, props.show])

    const closingUserOverlay = () => {
        if (!props.data) {
            if (
                name !== '' ||
                groupEmail !== '' ||
                (roleNames && Array.isArray(roleNames) && roleNames.length > 0)
            ) {
                setShowConfirm(true)
            } else {
                props.onClose()
            }
        } else {
            if (name !== props.data.name || groupEmail !== props.data.groupEmail) {
                setShowConfirm(true)
            } else {
                props.onClose()
            }
        }
    }

    const handleUserSave = async () => {
        setCreateButtonLoad(true)
        let error = false

        if (name === '') {
            error = true
            setErrorName('This is required')
        } else {
            setErrorName('')
        }

        if (groupEmail === '') {
            error = true
            setErrorGroupEmail('This is required')
        } else {
            setErrorGroupEmail('')
        }

        if (!error) {
            try {
                let result: any

                if (props.data) {
                    const data: Partial<Team> = {
                        name,
                        groupEmail,
                        roleNames:
                            roleNames && Array.isArray(roleNames)
                                ? roleNames.map((roleName) => roleName.id)
                                : undefined
                    }

                    console.log('data', data)

                    result = await updateTeam(props.data?._id, data)
                } else {
                    let data: Partial<Team> = {
                        name,
                        groupEmail,
                        roleNames:
                            roleNames && Array.isArray(roleNames)
                                ? roleNames.map((roleName) => roleName.id)
                                : undefined
                    }

                    result = await createTeam(data)
                }

                displaySnackbar(
                    props.data ? 'Team Edited Successfully' : 'Team Created Successfully',
                    SnackbarType.success,
                    addData
                )
                console.log('res', result)
                props.onSave(result)
            } catch (e) {
                displaySnackbar('Failed to save Team', SnackbarType.error, addData)
            }
        }
        setCreateButtonLoad(false)
    }

    useEnterSubmit(handleUserSave)

    return (
        <>
            <Overlay
                covered
                show={props.show}
                direction={OverlayDirection.right}
                openSize="500px"
                dismissable
                shadow={Colors.shadow}
                shadowDim={Settings.shadowDimensions}
                onClose={closingUserOverlay}
            >
                <PanelForm
                    titleSection={{
                        title: props.data ? 'Edit Team' : 'Add New Team',
                        close: closingUserOverlay
                    }}
                    saveSection={{
                        buttonText: props.data ? 'Edit Team' : 'Save Team',
                        discardOnClick: closingUserOverlay,
                        primaryOnClick: handleUserSave,
                        primaryButtonLoading: createButtonLoad
                    }}
                >
                    <TeamFormSection
                        name={name}
                        setName={setName}
                        errorName={errorName}
                        groupEmail={groupEmail}
                        setGroupEmail={setGroupEmail}
                        errorGroupEmail={errorGroupEmail}
                        roleNames={roleNames}
                        setRoleNames={setRoleNames}
                    />
                </PanelForm>
            </Overlay>

            {showConfirm ? (
                <ConfirmPopup
                    mainButtonLoad={false}
                    mainButtonText="Confirm"
                    onCancel={() => {
                        setShowConfirm(false)
                    }}
                    onClose={() => {
                        setShowConfirm(false)
                    }}
                    onSubmit={() => {
                        setShowConfirm(false)
                        props.onClose()
                    }}
                    subtitle="Are you sure you'd like to discard the changes?"
                    title="Discarding"
                />
            ) : (
                <></>
            )}
        </>
    )
}
