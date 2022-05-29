import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'
import { Container } from './Container'

export interface ITextField {
    value: string
    setValue: (newString: string) => void
}

export const TextField = (props: ITextField) => {
    const StyledInput = styled.input(() => ({
        display: 'flex',
        fontFamily: 'Roboto',
        outline: 'none',
        border: 'none',
        boxShadow: 'inset 20px 20px 60px #d9d9d9, inset -20px -20px 60px #ffffff',
        borderRadius: '50px',
        padding: '10px',
        backgroundColor: 'transparent'
    }))

    const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e) => {
        props.setValue(e.currentTarget.value)
    }

    return <StyledInput value={props.value} onInput={onInput} type="text" />
}
