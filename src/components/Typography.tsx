import { JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

export interface ITypography {
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent'
    children: JSX.Element
}

export const Typography = (props: ITypography) => {
    const StyledP = styled.p(() => ({
        display: 'flex',
        textAlign: props.textAlign,
        fontFamily: 'Roboto'
    }))

    return <StyledP>{props.children}</StyledP>
}
