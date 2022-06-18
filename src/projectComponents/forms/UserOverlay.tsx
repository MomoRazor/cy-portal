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
import { createUser, ICreateUser, IUser, updateUser } from '../../restAPI'
import { UserFormSection } from './UserFormSection'

export interface IUserOverlay {
    show: boolean
    data?: IUser
    secondaryPanel?: boolean
    covered?: boolean
    zIndex?: number
    onClose: EmptyFunctionHandler
    onSave: (newData?: IUser) => void
    isOverlay?: boolean
    setIsOverlay?: (newOverlay: boolean) => void
}

export const UserOverlay = (props: IUserOverlay) => {
    const { addData } = useContext(SnackbarContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const [createButtonLoad, setCreateButtonLoad] = useState(false)

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [surname, setSurname] = useState('')
    const [errorSurname, setErrorSurname] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    useEffect(() => {
        setErrorEmail('')
        setErrorName('')
        setErrorSurname('')

        setName(props.data?.name || '')
        setSurname(props.data?.surname || '')
        setEmail(props.data?.email || '')
    }, [props.data, props.show])

    const closingUserOverlay = () => {
        if (!props.data) {
            if (name !== '' || email !== '' || surname !== '') {
                setShowConfirm(true)
            } else {
                props.onClose()
                props.setIsOverlay && props.setIsOverlay(false)
            }
        } else {
            if (
                name !== props.data.name ||
                email !== props.data.email ||
                surname !== props.data.surname
            ) {
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

            if (surname === '') {
                error = true
                setErrorSurname('This is required')
            } else {
                setErrorSurname('')
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
                            name,
                            surname,
                            email
                        }

                        result = await updateUser(props.data?.id, data)
                    } else {
                        let data: ICreateUser = {
                            name,
                            surname,
                            email
                        }

                        result = await createUser(data)
                    }

                    displaySnackbar(
                        props.data ? 'Admin Edited Successfully' : 'Admin Created Successfully',
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
                        title: props.data ? 'Edit Admin' : 'Add New Admin',
                        close: closingUserOverlay
                    }}
                    saveSection={{
                        buttonText: props.data ? 'Edit Admin' : 'Save Admin',
                        discardOnClick: closingUserOverlay,
                        primaryOnClick: handleUserSave,
                        primaryButtonLoading: createButtonLoad
                    }}
                >
                    <UserFormSection
                        name={name}
                        setName={setName}
                        errorName={errorName}
                        email={email}
                        setEmail={setEmail}
                        errorEmail={errorEmail}
                        surname={surname}
                        setSurname={setSurname}
                        errorSurname={errorSurname}
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
