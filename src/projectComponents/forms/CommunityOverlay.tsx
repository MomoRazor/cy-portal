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
import { useContext, useEffect, useState } from 'react'
import { createCommunity, Community, updateCommunity } from '../../restAPI'
import { CommunityFormSection } from './CommunityFormSection'

export interface ICommunityOverlay {
    show: boolean
    data?: Community
    onClose: EmptyFunctionHandler
    onSave: (newData?: Community) => void
}

export const CommunityOverlay = (props: ICommunityOverlay) => {
    const { addData } = useContext(SnackbarContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const [createButtonLoad, setCreateButtonLoad] = useState(false)

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [groupEmail, setGroupEmail] = useState('')
    const [errorGroupEmail, setErrorGroupEmail] = useState('')

    useEffect(() => {
        setErrorName('')
        setErrorGroupEmail('')

        setName(props.data?.name || '')
        setGroupEmail(props.data?.groupEmail || '')
    }, [props.data, props.show])

    const closingUserOverlay = () => {
        if (!props.data) {
            if (name !== '' || groupEmail !== '') {
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
                    const data: Partial<Community> = {
                        name,
                        groupEmail
                    }

                    result = await updateCommunity(props.data?._id, data)
                } else {
                    let data: Partial<Community> = {
                        name,
                        groupEmail
                    }

                    result = await createCommunity(data)
                }

                displaySnackbar(
                    props.data ? 'Community Edited Successfully' : 'Community Created Successfully',
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
                    <CommunityFormSection
                        name={name}
                        setName={setName}
                        errorName={errorName}
                        groupEmail={groupEmail}
                        setGroupEmail={setGroupEmail}
                        errorGroupEmail={errorGroupEmail}
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
