import { createSignal, JSX } from 'solid-js'
import { styled } from 'solid-styled-components'
import { baseColor, lightSource } from '../style'
import { generateNeumorphismCss } from '../utils'

export interface ITextField {
    value: string
    setValue: (newString: string) => void
}

export const TextField = (props: ITextField) => {
    let ref: HTMLInputElement | undefined

    const [width, setWidth] = createSignal(0)
    const [height, setHeight] = createSignal(0)

    setTimeout(() => {
        setWidth(ref?.clientWidth || 0)
        setHeight(ref?.clientHeight || 0)
    }, 100)

    const StyledInput = styled.input(() => {
        const neuMorphic = generateNeumorphismCss(
            width(),
            height(),
            baseColor,
            'concave',
            lightSource
        )

        return {
            display: 'flex',
            fontFamily: 'Roboto',
            outline: 'none',
            border: 'none',
            borderRadius: '50px',
            padding: '10px',
            backgroundColor: 'transparent',
            width: '50%',
            ...neuMorphic
        }
    })

    const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e) => {
        props.setValue(e.currentTarget.value)
    }

    return <StyledInput ref={ref} value={props.value} onInput={onInput} type="text" />
}
