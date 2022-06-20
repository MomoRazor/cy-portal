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
import { createCommunity, ICreateCommunity, ICommunity, updateCommunity } from '../../restAPI'
import { CommunityFormSection } from './CommunityFormSection'

export interface ICommunityOverlay {
    show: boolean
    data?: ICommunity
    secondaryPanel?: boolean
    covered?: boolean
    zIndex?: number
    onClose: EmptyFunctionHandler
    onSave: (newData?: ICommunity) => void
    isOverlay?: boolean
    setIsOverlay?: (newOverlay: boolean) => void
}

export const CommunityOverlay = (props: ICommunityOverlay) => {
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
                        const data: Partial<ICreateCommunity> = {
                            name
                        }

                        result = await updateCommunity(props.data?.id, data)
                    } else {
                        let data: ICreateCommunity = {
                            name
                        }

                        result = await createCommunity(data)
                    }

                    displaySnackbar(
                        props.data
                            ? 'Community Edited Successfully'
                            : 'Community Created Successfully',
                        SnackbarType.success,
                        addData
                    )
                    props.onSave(result)
                } catch (e) {
                    displaySnackbar('Failed to save Community', SnackbarType.error, addData)
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
                        title: props.data ? 'Edit Community' : 'Add New Community',
                        close: closingUserOverlay
                    }}
                    saveSection={{
                        buttonText: props.data ? 'Edit Community' : 'Save Community',
                        discardOnClick: closingUserOverlay,
                        primaryOnClick: handleUserSave,
                        primaryButtonLoading: createButtonLoad
                    }}
                >
                    <CommunityFormSection name={name} setName={setName} errorName={errorName} />
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
