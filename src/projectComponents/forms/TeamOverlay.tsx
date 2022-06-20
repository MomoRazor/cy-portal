import {
    Colors,
    ConfirmPopup,
    displaySnackbar,
    EmptyFunctionHandler,
    Overlay,
    OverlayDirection,
    PanelForm,
    Settings,
    SnackbarContext,
    SnackbarType,
    useEnterSubmit
} from '@sector-eleven-ltd/se-react-toolkit'
import React, { useContext, useEffect, useState } from 'react'
import { createTeam, ICreateTeam, ITeam, updateTeam } from '../../restAPI'
import { TeamFormSection } from './TeamFormSection'

export interface ITeamOverlay {
    show: boolean
    data?: ITeam
    secondaryPanel?: boolean
    covered?: boolean
    zIndex?: number
    onClose: EmptyFunctionHandler
    onSave: (newData?: ITeam) => void
    isOverlay?: boolean
    setIsOverlay?: (newOverlay: boolean) => void
}

export const TeamOverlay = (props: ITeamOverlay) => {
    const { addData } = useContext(SnackbarContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const [createButtonLoad, setCreateButtonLoad] = useState(false)

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')

    useEffect(() => {
        setErrorName('')

        setName(props.data?.name || '')
    }, [props.data, props.show])

    const closingUserOverlay = () => {
        if (!props.data) {
            if (name !== '') {
                setShowConfirm(true)
            } else {
                props.onClose()
                props.setIsOverlay && props.setIsOverlay(false)
            }
        } else {
            if (name !== props.data.name) {
                setShowConfirm(true)
            } else {
                props.onClose()
                props.setIsOverlay && props.setIsOverlay(false)
            }
        }
    }

    const handleUserSave = async () => {
        if (props.isOverlay) {
            setCreateButtonLoad(true)
            let error = false

            if (name === '') {
                error = true
                setErrorName('This is required')
            } else {
                setErrorName('')
            }

            if (!error) {
                try {
                    let result: any

                    if (props.data) {
                        const data: Partial<ICreateTeam> = {
                            name
                        }

                        result = await updateTeam(props.data?.id, data)
                    } else {
                        let data: ICreateTeam = {
                            name
                        }

                        result = await createTeam(data)
                    }

                    displaySnackbar(
                        props.data ? 'Team Edited Successfully' : 'Team Created Successfully',
                        SnackbarType.success,
                        addData
                    )
                    props.onSave(result)
                } catch (e) {
                    displaySnackbar('Failed to save Team', SnackbarType.error, addData)
                }
            }
            setCreateButtonLoad(false)
        }
    }

    useEnterSubmit(handleUserSave)

    return (
        <>
            <Overlay
                zIndex={props.zIndex}
                covered={props.covered}
                show={props.show}
                direction={OverlayDirection.right}
                openSize={props.secondaryPanel ? '480px' : '500px'}
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
                    <TeamFormSection name={name} setName={setName} errorName={errorName} />
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
