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
import { createUser, ICreateUser, IUser, updateUser } from '../../restAPI'
import { UserFormSection } from './UserFormSection'

export interface IUserOverlay {
    show: boolean
    data?: IUser
    onClose: EmptyFunctionHandler
    onSave: (newData?: IUser) => void
    isOverlay?: boolean
    setIsOverlay?: (newOverlay: boolean) => void
}

export const UserOverlay = (props: IUserOverlay) => {
    const { addData } = useContext(SnackbarContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const [createButtonLoad, setCreateButtonLoad] = useState(false)

    const [displayName, setDisplayName] = useState('')
    const [errorDisplayName, setErrorDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    useEffect(() => {
        setErrorEmail('')
        setErrorDisplayName('')

        setDisplayName(props.data?.displayName || '')
        setEmail(props.data?.email || '')
    }, [props.data, props.show])

    const closingUserOverlay = () => {
        if (!props.data) {
            if (displayName !== '' || email !== '') {
                setShowConfirm(true)
            } else {
                props.onClose()
                props.setIsOverlay && props.setIsOverlay(false)
            }
        } else {
            if (displayName !== props.data.displayName || email !== props.data.email) {
                setShowConfirm(true)
            } else {
                props.onClose()
                props.setIsOverlay && props.setIsOverlay(false)
            }
        }
    }

    const handleUserSave = async () => {
        setCreateButtonLoad(true)
        let error = false

        if (displayName === '') {
            error = true
            setErrorDisplayName('This is required')
        } else {
            setErrorDisplayName('')
        }

        if (email === '') {
            error = true
            setErrorEmail('This is required')
        } else {
            setErrorEmail('')
        }

        if (!error) {
            try {
                let result: any

                if (props.data) {
                    const data: Partial<ICreateUser> = {
                        displayName,
                        email
                    }

                    result = await updateUser(props.data?._id, data)
                } else {
                    let data: ICreateUser = {
                        displayName,
                        email
                    }

                    result = await createUser(data)
                }

                displaySnackbar(
                    props.data ? 'User Edited Successfully' : 'User Created Successfully',
                    SnackbarType.success,
                    addData
                )
                props.onSave(result)
            } catch (e) {
                displaySnackbar('Failed to save User', SnackbarType.error, addData)
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
                        title: props.data ? 'Edit User' : 'Add New User',
                        close: closingUserOverlay
                    }}
                    saveSection={{
                        buttonText: props.data ? 'Edit User' : 'Save User',
                        discardOnClick: closingUserOverlay,
                        primaryOnClick: handleUserSave,
                        primaryButtonLoading: createButtonLoad
                    }}
                >
                    <UserFormSection
                        displayName={displayName}
                        setDisplayName={setDisplayName}
                        errorDisplayName={errorDisplayName}
                        email={email}
                        setEmail={setEmail}
                        errorEmail={errorEmail}
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
